import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}
  login(body:any): Observable<any>{
      return this.http.post(`${baseUrl}register/login`,body);
  }

  register(body:any): Observable<any>{
    return this.http.post(`${baseUrl}register`,body);
  }
}