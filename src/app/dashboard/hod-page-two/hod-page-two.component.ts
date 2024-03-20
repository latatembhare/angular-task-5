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
  status: any[]=[];
  updateLeaveStatus: any;
  constructor(private userServ: UserService, private httpServ: HttpService) {}
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.httpServ.getData().subscribe({
      next: (param: any) => {
        this.allData = param;
        console.log(param);
      },
    });
  }
  approveRequest(id: string) {
    this.httpServ.updateLeaveStatus(id, 'approved').subscribe(
      (res) => {
        console.log(res)},
      (error) => {
        console.error('Error updating leave status', error);
      }
    );
  }
  // approveRequest(id: any): void {
  //   console.log(this.allData)
  //   const request = this.allData.find(req => req.id === id);
  //   console.log(request)
  //   if (request) {
  //     request.status = 'Approved';
  //   }
  //   console.log(request.status)
  //   console.log(request)
  // }
  // rejectRequest(id:any): void {
  //   const request = this.allData.find(req => req.id === id);
  //   console.log(request)
  //   if (request) {
  //     request.status = 'Rejected';
  //   }
  //   console.log(request.status)
  // }
  rejectRequest(leaveId: string) {
    this.httpServ.updateLeaveStatus(leaveId, 'rejected').subscribe(
      (res) => {
        console.log(res);
        // Success message or handle UI updates
      },
      (error) => {
        console.error('Error updating leave status', error);
      }
    );
  }
}
