import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

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

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {}
  login() {
    if (this.loginForm.valid) {
      this.userService.Login(this.loginForm.value).subscribe((data) => {
        if (!data.success) {
          this.messageClass = 'alert alert-warning';
          this.message = data.message;
        } else {
          console.log(data);
          localStorage.setItem('token', data.token);
          const time_to_login = Date.now() + 86400; // one week
          localStorage.setItem('timer', JSON.stringify(time_to_login));
          this.loginForm.reset();
          this.router.navigate(['listing']);
        }
      });
      (err) => {
        console.log(err);
      };
    }
  }
}
