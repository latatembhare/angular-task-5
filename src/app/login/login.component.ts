import {
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
export class LoginComponent implements OnInit {
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
  @ViewChild('loginForm') loginForm: NgForm | any;
  @ViewChild('registerForm') registerForm: NgForm | any;
  @ViewChild('email')
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
    email: '',
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
    const email = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    const isUserExit = this.loginserv.Login(email, password);
    let user = this.userServ.allUser.find(
      (u) => u.email == email && u.password == password
    );
    if (isUserExit != undefined) {
      this.toastr.success('You have successfully login the page.');
        this.router.navigate(['/dashBoard/tasks']);
    } else {
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
    this.toastr.success('You have successfully register the page.');
    
  }
    this.registerForm.resetForm();
  }
  
 
}
