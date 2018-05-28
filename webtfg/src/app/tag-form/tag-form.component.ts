import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserU } from '../userU';
import { TagU } from '../tagU';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort, MatInput, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TabledialogComponent } from '../tabledialog/tabledialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
import { Generalform } from '../generalform';
@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent extends Generalform implements OnInit{
  protected object:TagU = {};
  private user:UserU = {};
  
  constructor(protected route: ActivatedRoute, protected location: Location, private dialog: MatDialog, protected generalService:GeneralService) {
    super(generalService, route, location);
  }
 
  ngOnInit(){
    this.navLinks = [
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
        path: "/"+ConsSettings.path_tag_component+"/"
      },
      {
        label: ""
      }
    ];
    this.URL = ConsSettings.URL_TAG;
    this.object_id_name = ConsSettings.attr_tag_code;
    this.doIt();
  }
  readParams(params){
    if (params.event_id != undefined) {
      this.object.event_id = params.event_id;
      this.navLinks[2]['path'] = "/"+ConsSettings.path_tag_component+"/"+params.event_id;
      this.generalService.getEventDescription(params.event_id).subscribe(value => {
        this.navLinks[1]['label'] +=value;
        this.navLinks[1]['path'] = "/"+ConsSettings.path_event_form+"/" +params.event_id;
      });
    }
  }

  getNewForm(){
    let tag_title = "Nueva pulsera";
    this.navLinks[3].label= tag_title;
    this.titleSubject.next(tag_title);
    this.loading = false;
  }

  onOpenDialogAddUser():void {
    let currentUser:UserU = {
      user_id: (this.object.user_id!=undefined) ? this.object.user_id : null,
      user_description: (this.object.user_description!=undefined) ? this.object.user_description : ""
    };
   
    let dialogRef = this.dialog.open(TabledialogComponent, {
      data: { user: currentUser }});

    dialogRef.afterClosed().subscribe(result => {
     if (result['user'] != undefined) {
       this.object.user_id = result.user.user_id;
       this.object.user_description = result.user.user_description;
     }
    });
  }

  getObject(){
    this.generalService.crud(ConsSettings.SINGLE_GET, ConsSettings.URL_TAG, this.id_url).subscribe(
      response => {
        this.objectSubject.next(response);
        this.titleSubject.next(response.tag_description);
        this.title = ConsSettings.title_tag + " " + response.tag_description;
        this.navLinks[1]['label'] = ConsSettings.title_event+ " "+response.event_description;
        this.navLinks[1]['path'] = "/"+ConsSettings.path_event_component+"/"+response.event_id;
        this.navLinks[2]['path'] = "/"+ConsSettings.path_tag_component+"/" +response.event_id;
        this.navLinks[3]['label'] = ConsSettings.title_tag + " " + response.tag_description;
        this.navLinks[3]['path'] = "/"+ConsSettings.path_tag_form+"/" + response.tag_code;
        this.loading = false;
      }
    );
  }

  onDisassociateUser(){
    this.object.user_id = null ;
    this.object.user_description= null;
  }

}
