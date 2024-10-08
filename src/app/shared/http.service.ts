import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://angular-task-5-6ac4c-default-rtdb.firebaseio.com/user.json';
  baseUrl = 'https://hod-staff-b085f-default-rtdb.firebaseio.com/data.json';
  public httpError$ = new Subject();
  private _Product$ = new Subject<void>();
  get _Product(){
    return this._Product$
  }
  constructor(private http: HttpClient,private userServ:UserService) {}
  postData(Data: any) {
    // to do post
    this.http
      .post(
        'https://hod-staff-b085f-default-rtdb.firebaseio.com/data.json',
        Data
      )
      .subscribe({
        next: (param: any) => {
          console.log(param);
        },
      });
  }
  getData() {
    return this.http
      .get('https://hod-staff-b085f-default-rtdb.firebaseio.com/data.json')
      .pipe(
        map((res: any) => {
          console.log(res);
          const userArr = [];
          for (let stdId in res) {
            userArr.push({ ...res[stdId], id: stdId });
          }
          console.log(userArr);
          return userArr;
        })
      );
  }
  updateLeaveStatus(id: string, status: string) {
    return this.http.patch('https://hod-staff-b085f-default-rtdb.firebaseio.com/data/'+id+'.json', { status });
  }

  // login and register
  postUser(Data: any) {
    // to do post
    this.http.post(this.apiUrl, Data).subscribe({
      next: (param: any) => {
        console.log(param)
        this.getUser();
      }, 
    })
  }
  getUser() {
    return this.http.get(this.apiUrl).pipe(
      map((res: any) => {
        console.log(res);
        const userArr = [];
        for (let stdId in res) {
          userArr.push({ ...res[stdId], id: stdId });
        }
        console.log(userArr);
        return userArr;
      })
    );
  }
}
