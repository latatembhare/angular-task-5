import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public httpError$ = new Subject();

  isLogged: boolean = false;
  userRole: any;
  constructor(private router: Router, private userServ: UserService) {}
  Login(username: string, password: string) {
    let user = this.userServ.allUser.find(
      (u) => u.username == username && u.password == password
    );
    // console.log(user.user);
    if (user === undefined) {
      this.isLogged = false; 
    } else {
      this.isLogged = true;
      return user;
    }
   
  }
  getUserRole() {
    return this.userRole;
  }
}
