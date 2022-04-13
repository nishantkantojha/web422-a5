import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public readToken(): User | null {
    const userToken = this.getToken();
    if (userToken) {
      return jwt_decode(userToken);
    }
    return null;
  }

  public register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, user);
  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }

  public isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
  }

}