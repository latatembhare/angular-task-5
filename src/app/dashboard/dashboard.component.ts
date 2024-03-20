import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userRole: any;
  constructor(private userServ: UserService,private loginServ:LoginService) {}
  ngOnInit(): void {
    this.userRole = this.loginServ.getUserRole()
    console.log(this.userRole)
    
  }
}
