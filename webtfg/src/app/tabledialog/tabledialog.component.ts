import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserU } from '../userU';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-tabledialog',
  templateUrl: './tabledialog.component.html',
  styleUrls: ['./tabledialog.component.css']
})
export class TabledialogComponent implements OnInit{
  private objectElement:string = "associate_user";
  noTable=false;
  private selectedYet:boolean = false;
  private user_selected:UserU = {};
  private arr_users:UserU[] = [];
  private loading:Boolean = true;

  myDataSource;
  dataSubject: BehaviorSubject<UserU[]> = new BehaviorSubject<UserU[]>(this.arr_users);
  
  constructor(public dialogRef: MatDialogRef<TabledialogComponent>, private generalService:GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user_selected = data.user;
    }
  
  ngOnInit(){
    this.chargeUsers();
    this.myDataSource = new MatTableDataSource(this.dataSubject.value);
  }
   
  chargeUsers(){
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_USERS).subscribe(res => { 
      this.arr_users = res;
      this.myDataSource.data = this.arr_users;
      this.noTable = true;
      this.loading = false;
    });
  }

  onSelectedRow(user:UserU){
    this.user_selected = user;
  }
}
