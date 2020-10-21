import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  message: any;
  messageClass: any;

  regForm = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.maxLength(30)])
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    repeadpassword: new FormControl('', [
      Validators.required,
      this.passwordsMatch,
    ]),
  });

  get Username() {
    return this.regForm.get('username');
  }

  get Email() {
    return this.regForm.get('email');
  }

  get Password() {
    return this.regForm.get('password');
  }

  get Repeadpassword() {
    return this.regForm.get('repeadpassword');
  }

  passwordsMatch(control: FormControl) {
    const password = control.root.get('password');
    return password && control.value != password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  register() {
    if (this.regForm.valid) {
      this.userService.Register(this.regForm.value).subscribe((data) => {
        if (!data.success) {
          this.messageClass = 'alert alert-warning';
          this.message = data.message;
        } else {
          console.log(data);
          this.regForm.reset();
          this.router.navigate(['/listing']);
        }
      });
    }
  }
}
