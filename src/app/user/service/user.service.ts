import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private base_Url = 'http://localhost:8080/';
  // public base_Url = '';

  constructor(public http$: HttpClient, public router: Router) {}

  Register(user) {
    return this.http$.post<any>(this.base_Url + 'api/auth/register', user);
  }

  Login(user) {
    return this.http$.post<any>(this.base_Url + 'api/auth/login', user);
  }
  LogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['listing']);
  }
  LoggedIn() {
    return !!localStorage.getItem('token');
  }

  ngOnInit() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && Date.now() > timer) {
      this.LogOut();
      this.router.navigate(['/login']);
    }
  }
}
