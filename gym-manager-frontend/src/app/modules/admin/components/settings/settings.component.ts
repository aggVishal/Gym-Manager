import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDialogComponent } from '../home/dialogs/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authservice.isLoggedInObservable().subscribe(result => {

      if (!result.success) {
        console.log(result.message);
        this.authservice.logout();
      }
      this.authservice.getGymDetailsByGymIdObservable(result.result.gymId).subscribe(result => {
        if (!result.success) {
          console.log(result.message);
          this.authservice.logout();
        }
        this.settingsForm.setValue(result.result);
      }, (err) => {
        this.authservice.logout();
        console.log(result.message);
      });
    },
      (err) => {
        console.log(err.message);
        this.authservice.logout();
      });
  }

  settingsForm = new FormGroup({
    gymId: new FormControl(''),
    fullName: new FormControl('', Validators.required),
    gymName: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gymEmail: new FormControl('', [Validators.email])
  });

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: { message: "Are you sure want to update?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        if (this.settingsForm.valid) {
          this.authservice.updateGym(this.settingsForm.value).subscribe(result => {
            if (result.success) {
              this.openSnackBar('Updated successfully', 'Close')
            }
            else {
              console.log(result);
            }
          },
            (err) => {
              console.log(err.message);
            });
        }
      }
    })
  };
}
