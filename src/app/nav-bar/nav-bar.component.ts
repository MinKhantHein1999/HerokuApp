import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
