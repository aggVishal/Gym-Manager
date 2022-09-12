import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authservice.isLoggedIn()) {
      this.router.navigateByUrl('/admin');
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onSubmit(): void {

    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe(result => {
        if (result.success) {
          this.authservice.setToken(result.token);
          this.router.navigateByUrl('/admin');
        }
        else {
          alert(result.message);
        }
      },
        (err) => {
          alert(err.message);
        });
    }

  };

}
