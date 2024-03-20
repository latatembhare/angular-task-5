import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeavePopUpComponent } from './dashboard/apply-leave-pop-up/apply-leave-pop-up.component';
import { AplliedLeaveComponent } from './dashboard/apllied-leave/apllied-leave.component';
import { HodPageTwoComponent } from './dashboard/hod-page-two/hod-page-two.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashBoard',
    children: [
      { path: 'aplliedLeave', component: AplliedLeaveComponent },
      { path: 'leavePopUp', component: ApplyLeavePopUpComponent },

      {path:'hod-page-two',component:HodPageTwoComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
