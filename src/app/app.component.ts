/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Florence Soliva Student ID: 061852091 Date: 2022-04-10
 *
 *  Online URL: https://marvelous-kleicha-a4ac26.netlify.app
 *
 ********************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';
import User from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  token: User | null = null; // { _id: '', userName: '', password: '' };
  title = 'web422-a6';
  searchString: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });
  }

  logout() {
    console.log('a');
    this.authService.logout();
    this.token = null;
    this.router.navigate(['/login']);
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
