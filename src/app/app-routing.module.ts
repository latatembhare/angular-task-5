import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './dashboard/task/task.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashBoard',
    children: [
      // { path: 'aplliedLeave', component: AplliedLeaveComponent },
      { path: 'tasks', component: TaskComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
