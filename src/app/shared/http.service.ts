import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://task-manager-c60b7-default-rtdb.firebaseio.com/log.json';
  baseUrl = 'https://task-manager-c60b7-default-rtdb.firebaseio.com/data.json';
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
        this.baseUrl,
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
      .get(this.baseUrl)
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
  deleteSingleStudent(id:any){
    this.http.delete('https://task-manager-c60b7-default-rtdb.firebaseio.com/data/'+id+'.json').subscribe()
  }
  updateTask(id:any,value:any){
    this.getData()
    this.http.put('https://task-manager-c60b7-default-rtdb.firebaseio.com/data/'+id+'.json',value).subscribe()
    this.getData()
  }
}
