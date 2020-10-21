import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class NonauthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    if (this.userService.LoggedIn()) {
      this.router.navigate(['/listing']);
      return false;
    } else {
      return true;
    }
  }
}
