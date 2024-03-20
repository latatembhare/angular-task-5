import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { HttpErrorResponse } from '@angular/common/http';
interface Department {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm | any;
  @ViewChild('registerForm') registerForm: NgForm | any;
  @ViewChild('username')
  username!: ElementRef;
  @ViewChild('password')
  password!: ElementRef;
  dept: Department[] = [
    { value: 'sales', viewValue: 'Sales' },
    { value: 'development', viewValue: 'development' },
    { value: 'testing', viewValue: 'Testing' },
  ];
  selectedValue: any;
  selectedOption: any;
  usernames = ['HOD', 'STAFF'];
  allUser: any[] = [];
  // password: any;
  // username!: any;
  loginObj: any = {
    username: '',
    password: '',
  };
  httpErrMsg: any;
  httpError$: any;
  constructor(private httpServ: HttpService,private userServ:UserService,private router:Router,private loginserv:LoginService) {}
  ngOnInit(): void {
    this.httpServ.getUser().subscribe({
      next: (param: any) => {
        this.allUser = param;
        this.userServ.sendUserdata(this.allUser)
        console.log(this.allUser);
      },
    });
    this.httpServ.httpError$.subscribe({
      next : (errorResp : HttpErrorResponse | any)=>{
        console.log(errorResp);
        this.httpErrMsg = errorResp?.error?.error?.message;
        if(errorResp?.error?.error?.message === 'INVALID_LOGIN_CREDENTIALS'){
          // wrong login credetials were used
        }else if(errorResp?.error?.error?.message?.includes('WEAK_PASSWORD')){
          // when user inputs weak password
        }else if(errorResp?.error?.error?.message?.includes('MISSING_PASSWORD')){
          // when user inputs is not available
        }else if(errorResp?.error?.error?.message?.includes('INVALID_EMAIL')){
          // when user inputs invalid/incorrect email
        }else if(errorResp?.error?.error?.message?.includes('MISSING_EMAIL')){
          // when user empty email inputs
        }
      }
    })
      }
  onLogin() {
    const username = this.username.nativeElement.value
    const password = this.password.nativeElement.value
    const isUserExit = this.loginserv.Login(username,password)
    let user =   this.userServ.allUser.find((u)=>u.username == username && u.password == password)
    if(isUserExit!=undefined){
      alert('login succesfull')
      if (user.user === 'HOD') {
        this.router.navigate(['/dashBoard/hod-page-two']);
      } else if (user.user === 'STAFF') {
        this.router.navigate(['/dashBoard/aplliedLeave']);
      }
    } else{
      alert('wrong credentials')
    }

    this.loginForm?.resetForm();
  }
  onSignUp(value: any) {
    console.log(this.registerForm.value);
    this.httpServ.postUser(this.registerForm.value);
    this.registerForm.resetForm();
  }
}
