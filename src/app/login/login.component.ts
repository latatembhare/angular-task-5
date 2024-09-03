import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
interface Department {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit,AfterViewInit {
  dynamicNumberDiff: any;
  minlength: number = 10;
  contact:any
  registrationForm: any;
  registeredHODs: any;
  constructor(
    private httpServ: HttpService,
    private userServ: UserService,
    private router: Router,
    private loginserv: LoginService,
    private toastr: ToastrService
  ) {this.selectedOption = 'STAFF'}
  ngAfterViewInit(): void {
    
  }
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
  loginObj: any = {
    username: '',
    password: '',
  };
  ngOnInit(): void {
    this.httpServ.getUser().subscribe({
      next: (param: any) => {
        this.allUser = param;
        this.userServ.sendUserdata(this.allUser);
        console.log(this.allUser);
      },
    });
  }
  getPhoneNumberDiff(){
    return Math.abs(this.dynamicNumberDiff.length-this.minlength)
  }
  onLogin() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    const isUserExit = this.loginserv.Login(username, password);
    let user = this.userServ.allUser.find(
      (u) => u.username == username && u.password == password
    );
    if (isUserExit != undefined) {
      // alert('login succesfull')
      this.toastr.success('You have successfully login the page.');
      if (user.user === 'HOD') {
        localStorage.setItem('dept',JSON.stringify(user.dept) );
        this.router.navigate(['/dashBoard/hod-page-two']);
      } else if (user.user === 'STAFF') {
        console.log(user.firstname)
        let fullname = `${user.firstname} ${user.lastname}`
        console.log(fullname)
        localStorage.setItem('fullName', JSON.stringify(fullname));
        localStorage.setItem('dept',JSON.stringify(user.dept) );
          // this.loginserv.sendId(fullname)
        this.router.navigate(['/dashBoard/aplliedLeave']);
      }
    } else {
      // alert('wrong credentials')
      this.toastr.error(
        'wrong credentials.please register before acceess the page.'
      );
    }
    this.loginForm?.resetForm();
  }
  onSignUp(value: any) {
    this.httpServ.postUser(this.registerForm.value);
    console.log(this.registerForm.value.dept)
    console.log(this.registerForm.value.user)
    let user = this.userServ.allUser.find(
      (u) => u.user===this.registerForm.user
    );
    console.log(this.dept);
  const isExit =  this.userServ.allUser.find((u)=>u.dept === this.registerForm.value.dept&&u.user ===this.registerForm.value.user)
  console.log(isExit.user)
  if(isExit.user==='HOD' ){
    this.toastr.error(
      'user is already register with this department'
    );
  }
  else {
    // this.httpServ.postUser(this.registerForm.value);
    this.toastr.success('You have successfully register the page.');
  }
    this.registerForm.resetForm();
  }
}
