import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_Url = 'http://localhost:8080/';

  constructor(private http$: HttpClient) {}

  Register(user) {
    return this.http$.post<any>(this.base_Url + 'api/auth/register', user);
  }
}
