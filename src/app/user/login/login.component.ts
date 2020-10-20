import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });
  messageClass: string;
  message: any;

  get Email() {
    return this.loginForm.get('email');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  constructor() {}

  ngOnInit(): void {}
  login() {}
}
