import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-apllied-leave',
  templateUrl: './apllied-leave.component.html',
  styleUrl: './apllied-leave.component.scss'
})
export class AplliedLeaveComponent  {
  allData: any[]=[];
  totalLeaves: number = 10;
  approvedLeaves: number = 0;
  rejectedLeaves: number = 0;
  leaveRequest :[]=[]
  constructor(private httpServ:HttpService,private userServ:UserService){}
  ngOnInit(): void {
     this.getAllData()
     this.calculateLeaves()
  }
  getAllData(){
    this.httpServ.getData().subscribe({
      
      next:(param:any)=>{
        this.allData = param
        console.log(this.allData)
        this.calculateLeaves()
      }
      
    })
  }
  calculateLeaves() {
    this.approvedLeaves = this.allData.filter(status => status.status === 'approved').length;
    
    this.rejectedLeaves = this.allData.filter(status => status.status === 'rejected').length;
  }
}
