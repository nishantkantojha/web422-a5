import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import jwt_decode from 'jwt-decode';

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAPIBase = environment.userAPIBase;

  constructor(
    private http: HttpClient // private spotifyToken: SpotifyTokenService
  ) {}

  public getToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public readToken(): User {
    const token = this.getToken(); //localStorage.getItem('access_token');
    return jwt_decode(token);

    // if (token) {
    // }
    // else {
    //   return null;
    // }
  }

  isAuthenticated(): boolean {
    const token = this.getToken(); //localStorage.getItem('access_token');
    // Note: We can also use helper.isTokenExpired(token)
    // to see if the token is expired

    if (token) {
      //console.log('token exists');
      return true;
    } else {
      //console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    // Attempt to login
    return this.http.post<any>(`${this.userAPIBase}/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  register(user: RegisterUser): Observable<any> {
    // Attempt to register
    return this.http.post<any>(`${this.userAPIBase}/register`, user);
  }
}
