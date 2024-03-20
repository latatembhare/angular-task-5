import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave-pop-up',
  templateUrl: './apply-leave-pop-up.component.html',
  styleUrl: './apply-leave-pop-up.component.scss',
})
export class ApplyLeavePopUpComponent implements OnInit {
   myStdForm: FormGroup | any;
  constructor(private userServ: UserService,private fb:FormBuilder,private httpServ:HttpService,private router:Router) {}
  ngOnInit(): void {
    this.myStdForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      startdate: this.fb.control('', Validators.required),
      enddate: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required),
      status:this.fb.control('Pending')
    });
  }
 onSubmit(param:any){
  console.log(param)
  this.httpServ.postData(this.myStdForm.value)
this.router.navigate(['/dashBoard/aplliedLeave'])
 }
 
}
