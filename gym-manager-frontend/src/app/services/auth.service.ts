import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { baseUrl, s3imageURL } from 'src/environments/environment';
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

  // getGymId(){
  //   this.isLoggedInObservable().subscribe(result=>{
  //     if(!result.success){
  //       console.log(result.message);
  //       this.logout();
  //     }
  //     else{
  //       console.log(result.result.gymId)
  //       return result.result.gymId;
  //     }
  //   },
  //   (err)=>{
  //     console.log(err.message);
  //     this.logout();
  //   });
  // }

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

  getGymDetailsByGymIdObservable(id: any): Observable<any> {
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.get(`${baseUrl}register/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
    });
  }

  updateGym(body: any): Observable<any> {

    if (!this.isLoggedIn()) {
      this.logout();
      return of({});
    }
    return this.http.post(`${baseUrl}register/update`, body, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
    });
  }


  // Members

  getMembersByGymIdObservable(id: any): Observable<any> {
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.get(`${baseUrl}members/gymId/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
    });
  }

  addMember(body: any): Observable<any> {
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.put(`${baseUrl}members`, body, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
    });
  }

  deleteMember(id: any): Observable<any> {
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.delete(`${baseUrl}members/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
    });
  }

  uploadAvatar(imageId: any, imageFile: any){
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.put(`${s3imageURL}/${imageId}`,imageFile, {
      headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    })
  }

  deleteAvatar(imageId: any){
    if (!this.isLoggedIn()) {
      this.logout();
      return of({ success: 0 });
    }
    return this.http.delete(`${s3imageURL}/${imageId}`)
  }

}