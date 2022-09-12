import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(item:any){
    this.authservice.register(item).subscribe(result=>{
      if(result.success){
        console.log(result);
        console.log(item);
        alert(item.gymName + " registered successfully!");
        this.router.navigateByUrl('/login');
      }
      else{
        alert(result.message);
      }
    })
  }

}
