import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  allUser: any[] = []; 
    constructor(private router: Router) {}
    // public leaveRequest = new BehaviorSubject<any>(null)
  public userArr = new BehaviorSubject<any>([])
  signUpData = this.userArr
  public dateInfo = new BehaviorSubject<any>([]);
   sendUserdata(data: any) {
    console.log(data);
    this.allUser = data;
    console.log(this.allUser);
  }
 
 }
