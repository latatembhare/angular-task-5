import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/login.service';

@Component({
  selector: 'app-apply-leave-pop-up',
  templateUrl: './apply-leave-pop-up.component.html',
  styleUrl: './apply-leave-pop-up.component.scss',
})
export class ApplyLeavePopUpComponent implements OnInit {
  myStdForm: FormGroup | any;
  currentProductId: any;
  data: any;
  leaveData: any;
  allData: any;
  storedLeaveDetails: any
  dataArray: any
  storedDept: any
  dataArray2: any;
  constructor(
    private userServ: UserService,
    private fb: FormBuilder,
    private httpServ: HttpService,
    private router: Router,
    private loginServ:LoginService
  ) {
    this.getAllData()
  }
  ngOnInit(): void {
    this.getAllData()
    this.myStdForm = this.fb.group({
      //  name: this.fb.control('', Validators.required),
      startdate: this.fb.control('', Validators.required),
      enddate: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required),
      status: this.fb.control('Pending'),
    });
    this.storedLeaveDetails = localStorage.getItem('fullName');
    this.storedDept = localStorage.getItem('dept');
    this.dataArray = this.storedLeaveDetails.replace(/^"|"$/g, '');
    this.dataArray2 = this.storedDept.replace(/^"|"$/g, '');
    console.log(this.dataArray)
    console.log(this.dataArray2)
    // this.loginServ.staffFullname.subscribe((id) => {
    //   console.log(id);
    //   this.currentProductId = id;
    //   console.log(this.data)
    //    this.leaveData = {
    //     ...this.myStdForm.value,
    //     fullName: this.currentProductId
    //   };
    // });
  }
  getAllData() {
    this.httpServ.getData().subscribe({
      next: (param: any) => {
        this.allData = param;
      },
    });
  }
  onSubmit(param: any) {
    console.log(param);
    this.httpServ.postData( {...this.myStdForm.value,
      fullName: this.dataArray,dept:this.dataArray2});
      this.refreshLeaveDetails()
    this.router.navigate(['/dashBoard/aplliedLeave']);
  }
  cancel(){
    this.router.navigate(['/dashBoard/aplliedLeave']);
  }
  refreshLeaveDetails(): void {
    this.httpServ.getData().subscribe((leaveDetails: any) => {
      this.allData = leaveDetails;
    });
  }
}
