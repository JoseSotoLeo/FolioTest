import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }


  loginService(user: User) {
    localStorage.clear();
    localStorage.setItem('Username', user.username);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserInfo(): string {
    if (!localStorage.getItem('Username')) { return }
    return localStorage.getItem('Username')
  }

}
