import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(item:any){
    this.authservice.login(item).subscribe(result=>{
      if(result.success){
        console.log(result);
        alert("Welcome");
      }
      else{
        alert(result.result);
      }
    })
  }

}