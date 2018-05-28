import {Component, ViewChild, OnInit,AfterViewInit, Inject } from '@angular/core';
import {MatPaginator, MatSort,MatInput, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { UserU } from '../userU';
import { TagU } from '../tagU';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogComponent } from '../dialog/dialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  private arr_users:UserU[] = [];
  myDataSource;
  private title:string = "";
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.title);
  dataSubject: BehaviorSubject<UserU[]> = new BehaviorSubject<UserU[]>(this.arr_users);
  private loading:Boolean = true;
  private navLinks = [
    {
      label: ConsSettings.title_event_s,
      path: "/"+ConsSettings.path_event_component
    },
    {
      label: ConsSettings.title_user_s,
      path: "/"+ConsSettings.path_user_component
    }
  ];
  private activeLinkIndex = -1;

  constructor(private dialog: MatDialog, private generalService:GeneralService) {
  }
  ngOnInit(){
    this.myDataSource = new MatTableDataSource(this.dataSubject.value);
    this.titleSubject.subscribe(value => this.title = value);
    this.titleSubject.next(ConsSettings.title_user_s);
    this.chargeUsers();
  }

  chargeUsers(){
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_USERS).subscribe(res => { 
      this.arr_users = res;
      this.myDataSource.data = this.arr_users;
      this.loading = false;
    });
  }

  onDeleted(row:any){
    this.generalService.crud(ConsSettings.DELETE, ConsSettings.URL_USERS, row.user_id).subscribe(response => {
      if(!response[ConsSettings.Error]) this.chargeUsers();}
    );
  }

}
