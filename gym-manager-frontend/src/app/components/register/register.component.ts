import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    fullName: new FormControl('',Validators.required),
    gymName: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit(): void{
    if(this.registerForm.valid){
      this.authservice.register(this.registerForm.value).subscribe(result=>{
        if(result.success){
          console.log("register successfully!");
          console.log(result);
          console.log(this.registerForm.value);
          this.router.navigateByUrl('/login');
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
