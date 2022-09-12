import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    console.log('tokenAdded');
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedInObservable(): Observable<any> {
    if (this.getToken() == null) {
      return of({ success: 0 });
    }
    else {
      return this.http.post(`${baseUrl}register/auth`, { "token": this.getToken() });
    }
  }

  isLoggedIn(): boolean {
    this.isLoggedInObservable().subscribe(result => {
      if (!result.success) {
        console.log(result.message);
        this.logout();
        return false;
      }
      return true;
    },
      (err) => {
        console.log(err.message);
        this.logout();
        return false;
      });
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('tokenRemoved');
    this.router.navigateByUrl('/login');
  }

  login(body: any): Observable<any> {
    return this.http.post(`${baseUrl}register/login`, body);
  }

  register(body: any): Observable<any> {
    return this.http.post(`${baseUrl}register`, body);
  }
}