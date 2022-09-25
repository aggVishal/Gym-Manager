import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {

  constructor(private authservice: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      duration: 2000
    });
  }


  private today = new Date();
  private date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();

  addMemberForm = new FormGroup({
    gymId: new FormControl(null),
    memberName: new FormControl(null, Validators.required),
    contact: new FormControl(null, [Validators.pattern("^[0-9]{10}$"), Validators.required]),
    email: new FormControl(null, [Validators.email]),
    address: new FormControl(null),
    memberPic: new FormControl(null),
    firstDay: new FormControl(this.date),
    memPeriod: new FormControl(1, [Validators.required]),
    memPrize: new FormControl(1800, [Validators.required])
  });

  async addItem() {
    this.authservice.isLoggedInObservable().subscribe(result => {
      if (!result.success) {
        this.authservice.logout();
        console.log(result.message);
      }
      else {
        new Promise((resolve, reject) => {
          this.addMemberForm.controls['gymId'].setValue(this.data.gymId);
          this.authservice.addMember(this.addMemberForm.value).subscribe(result => {
            if (result.success == 0) {
              reject(console.log("addItem error: ", result.message));
            } else {
              resolve(console.log("addItem result: ", result.result));
            }
          }, (err) => {
            console.log(err.message);
          });
        }).then(async (value) => {
    
          await this.openSnackBar("Member added!", "Close");
          this.dialogRef.close();
    
        }).catch(err => {
          console.log(err);
        });        
      }
    }, (err) => {
      console.log(err);
    });
  }
}
