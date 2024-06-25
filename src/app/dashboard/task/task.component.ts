import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../shared/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
interface Task {
  value: string;
  viewValue: string;
}
export interface UserData {
  body: string;
  id: number;
  title: number;
  userid: string;
}
@Component({
  selector: 'app-apply-leave-pop-up',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  myStdForm: FormGroup | any;
  currentProductId: any;
  data: any;
  leaveData: any;
  allData: any;
  storedLeaveDetails: any;
  dataArray: any;
  storedDept: any;
  dataArray2: any;
  filterText = '';
  currentStdId: any;
  selectedTask: any;
  editMode: boolean = false;
  currentTaskId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'delete',
    'update',
  ];
  dataSource!: MatTableDataSource<UserData>;
  submitted: boolean=false;
  constructor(
    private userServ: UserService,
    private fb: FormBuilder,
    private httpServ: HttpService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.getAllData();
  }
  selectedValue!: string;
  tasks: Task[] = [
    { value: 'To-do', viewValue: 'To-do' },
    { value: 'done', viewValue: 'done' },
    { value: 'in-progress', viewValue: 'in-progress' },
  ];
  ngOnInit(): void {
    this.getAllData()
    this.myStdForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      status: this.fb.control('', Validators.required),
    });
    this.getAllData();
  }
  getAllData() {
    this.httpServ.getData().subscribe({
      next: (param: any) => {
        this.allData = param;
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.allData);
      },
    });
  }
  onSubmit(param: any) {
   
    if (!this.editMode) {
      this.httpServ.postData(this.myStdForm.value);
      this.getAllData();
        this.myStdForm.reset();
        this.editMode = false;
        this.cdr.detectChanges();
        this.toastr.success('You have successfully added the task.');

    } else {
      this.httpServ.updateTask(this.currentStdId, this.myStdForm.value);
      this.getAllData();
        this.myStdForm.reset();
        this.editMode = false;
        this.cdr.detectChanges();
        this.toastr.success('You have successfully updated the task.');
    }
    this.editMode = false;
    this.getAllData();
  }
  cancel() {
    this.router.navigate(['/dashBoard/leavePopUp']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onUpdate(id: any) {
    this.currentStdId = id;
    console.log(id);
    let currentStd = this.allData.find((std: { id: any }) => {
      return std.id === id;
    });
    console.log(currentStd);
    this.myStdForm.setValue({
      title: currentStd.title,
      description: currentStd.description,
      status: currentStd.status,
    });
    this.getAllData()
    this.editMode = true;
  }
  onDelete(id: any) {
    this.getAllData();
    this.httpServ.deleteSingleStudent(id);
    
      this.toastr.success('You have successfully deleted the task.');
      
    this.getAllData();
  }
}
