import { Component, OnInit, ViewChild } from '@angular/core';
import { TagU } from '../tagU';
import { UserU } from '../userU';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TabledialogComponent } from '../tabledialog/tabledialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ElementDef } from '@angular/core/src/view';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit{
  private queryParams = {};
  private arr_tags:TagU[] = [];
  private event_id:number;
  private event_description:string = "";
  private navLinks = [
    {
      label: ConsSettings.title_event_s,
      path: "/"+ConsSettings.path_event_component
    },
    {
      label: ConsSettings.title_event + " ",
      path: ""
    },
    {
      label: ConsSettings.title_tag_s,
      path: "/"+ConsSettings.path_tag_component
    }

  ];
  private activeLinkIndex = -1;
  private myDataSource;
  private title:string = "";
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.title); 
  private dataSubject: BehaviorSubject<TagU[]> = new BehaviorSubject<TagU[]>(this.arr_tags);
  private loading:Boolean = true;

  chargeTags(){
    this.queryParams = { "event_id": this.event_id };
    this.navLinks[1].path = "/"+ConsSettings.path_event_form+"/" + this.event_id;
    this.navLinks[2].path = "/"+ConsSettings.path_tag_component+"/" + this.event_id;
    this.generalService.getEventDescription(this.event_id).subscribe (event_desc => {
      this.navLinks[1].label = ConsSettings.title_event + " " + event_desc;
    })
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_TAG+'?'+ConsSettings.attr_event_id+'='+this.event_id).subscribe({
      next: value => { 
        this.arr_tags = value;
        this.myDataSource.data = this.arr_tags;
        this.generalService.getEventDescription(this.event_id).subscribe ( event_desc => {
          this.event_description=event_desc;
          this.loading = false;
        });
      }});
  }
  constructor(private route: ActivatedRoute, private location: Location, private dialog: MatDialog, private generalService:GeneralService) {
  }
    
  ngOnInit (){
    this.titleSubject.subscribe(value => this.title = value);
    this.titleSubject.next(ConsSettings.title_tag_s);
    this.myDataSource = new MatTableDataSource(this.dataSubject.value);
    this.event_id = +this.route.snapshot.paramMap.get(ConsSettings.attr_event_id);
    if (this.event_id>0) this.chargeTags();
  }

  onDeleted(row:any){
    this.generalService.crud(ConsSettings.DELETE, ConsSettings.URL_TAG, row.tag_code).subscribe(
      response => {
        if(!response[ConsSettings.Error]) this.chargeTags();
      }
    );
  }
  
  onOpenDialogAddUser(tag){
    let currentUser:UserU = {
      user_id: (tag.user_id!=undefined) ? tag.user_id : null,
      user_description: (tag.user_description!=undefined) ? tag.user_description : ""
    };
   
    const dialogRefUser = this.dialog.open(TabledialogComponent, {
      data: { user: currentUser }});

    dialogRefUser.afterClosed().subscribe(result => {
      if (result.user != undefined) {
      tag.user_id = result.user.user_id;
      tag.user_description = result.user.user_description;
      this.generalService.crud(ConsSettings.PUT, ConsSettings.URL_TAG, tag.tag_code, tag).subscribe();
      }
    });
  }

  onDisassociateUser(tag){
    tag.user_id = null ;
    tag.user_description= null;
    this.generalService.crud(ConsSettings.PUT, ConsSettings.URL_TAG, tag.tag_code, tag).subscribe();
  }
    
}