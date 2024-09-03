import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-hod-page-two',
  templateUrl: './hod-page-two.component.html',
  styleUrl: './hod-page-two.component.scss',
})
export class HodPageTwoComponent implements OnInit {
  private subcription: any;
  allData: any[] = [];
  status: any[] = [];
  updateLeaveStatus: any;
  storedDept: any;
  dataArray2: any;
  deptName: any[] = [];
  storedLeaveDetails: any;
  dataArray: any;
  constructor(private userServ: UserService, private httpServ: HttpService) {
    this.getAllData();
  }
  ngOnInit() {
    this.getAllData();
    this.storedDept = localStorage.getItem('dept');
    this.dataArray2 = this.storedDept.replace(/^"|"$/g, '');
    console.log(this.dataArray2);
    this.getAllData();
  }
  getAllData() {
    this.httpServ.getData().subscribe({
      next: (param: any) => {
        this.allData = param;
        this.deptName = this.allData.filter(
          (status) => status.dept === this.dataArray2
        );
        console.log(this.deptName);
      },
    });
  }
  approveRequest(id: string) {
    this.httpServ.updateLeaveStatus(id, 'approved').subscribe(
      (res) => {
        this.getAllData()
        console.log(res);
      },
      (error) => {
        console.error('Error updating leave status', error);
      }
    );
  }
  rejectRequest(leaveId: string) {
    this.httpServ.updateLeaveStatus(leaveId, 'rejected').subscribe(
      (res) => {
        console.log(res);
        this.getAllData()
      },
      (error) => {
        console.error('Error updating leave status', error);
      }
    );
  }
  
}
