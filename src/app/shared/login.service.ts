import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: boolean = false;
  user: any;
  Staff: any;
  staffFullname = new BehaviorSubject(null)
  // sendId(fname: any) {
  //   console.log(fname)
  //   this.staffFullname.next(fname);
  //   localStorage.setItem('currentProductId', fname); 
  // }
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
  logout(): void {
    // Your logout logic here
    this.isLogged = false;
  }
  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
