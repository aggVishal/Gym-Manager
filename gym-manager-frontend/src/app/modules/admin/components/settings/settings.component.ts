import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) { }

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

  onSubmit(): void {
    console.log(this.settingsForm.value);

    if (this.settingsForm.valid) {
      this.authservice.updateGym(this.settingsForm.value).subscribe(result => {
        if (result.success) {
          alert('Updated successfully');
        }
        else {
          console.log(result);
          alert(result.message);
        }
      },
        (err) => {
          alert(err.message);
        });
    }
  };
}
