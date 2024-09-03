import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  login: boolean =false;
  userArray: any[]=[];
  constructor(private loginServ: LoginService,private httpServ:HttpService) {
    this.isLoggedIn();
    this.logout()
  }
  ngOnInit(): void {
    this.login = false
  }
  isLoggedIn(): boolean {
    this.login = true;
    return this.loginServ.isLoggedIn();
  }

  logout(): void {
    this.login = false;
    this.loginServ.logout();
  }
}
