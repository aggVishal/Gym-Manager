import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authservice.isLoggedIn()){
      this.router.navigateByUrl('/admin');
      // this.router.navigateByUrl('/login')
    }
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(): void{

    if(this.loginForm.valid){
      this.authservice.login(this.loginForm.value).subscribe(result=>{
        if(result.success){
          this.authservice.setToken(result.token);
          this.router.navigateByUrl('/admin');
        }
        else{
          alert(result.message);
        }
      },
      (err)=>{
        alert(err.message);
      });
    }
    
  };

}
