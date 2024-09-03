import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpService } from '../../shared/http.service';
import { LoginService } from '../../shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-apllied-leave',
  templateUrl: './apllied-leave.component.html',
  styleUrl: './apllied-leave.component.scss',
})
export class AplliedLeaveComponent {
  allData: any[] = [];
  totalLeaves: number = 20;
  approvedLeaves: number = 0;
  rejectedLeaves: number = 0;
  leaveRequest: [] = [];
  staff: string = '';
  staffName: any[] = [];
  userDetails: any[] | undefined;
  firstName: any;
  lastName: any;
  fullName: any;
  currentProductId: any;
  storedLeaveDetails: any
  dataArray: any;
  storedProductId: any;
  storedDept: any
  dataArray2: any
  constructor(
    private httpServ: HttpService,
    private userServ: UserService,
    private loginServ: LoginService,
    private router: ActivatedRoute
  ) {
    this.getAllData();
    this.calculateLeaves();
  }
  ngOnInit() {
    this.getAllData();
      this.calculateLeaves();
      this.refreshLeaveDetails()

    this.storedLeaveDetails = localStorage.getItem('fullName');
    this.dataArray = this.storedLeaveDetails.replace(/^"|"$/g, '');
    console.log(this.dataArray)
    this.storedDept = localStorage.getItem('dept');
    this.dataArray2 = this.storedDept.replace(/^"|"$/g, '');
    // this.fullName = `${this.firstName} ${this.lastName}`;
    // console.log(this.fullName);
    // this.loginServ.staffFullname.subscribe((id) => {
    //   console.log(id);
    //   this.currentProductId = id;
      
    // });
    this.getAllData();
      this.calculateLeaves();
      }
  getAllData() {
    this.httpServ.getData().subscribe({
      next: (param: any) => {
        this.allData = param
        console.log(this.allData);
        this.calculateLeaves();
        this.refreshLeaveDetails()
      },
    });
  }
  calculateLeaves() {
    this.staffName = this.allData.filter(
      (status) => status.fullName == this.dataArray && status.dept === this.dataArray2
    );
    console.log(this.staffName);
    this.approvedLeaves = this.staffName.filter(
      (status) => status.status === 'approved'
    ).length;
    this.rejectedLeaves = this.staffName.filter(
      (status) => status.status === 'rejected'
    ).length;
  }
  refreshLeaveDetails(): void {
    this.httpServ.getData().subscribe((leaveDetails: any) => {
      this.allData = leaveDetails;
    });
  }
}
