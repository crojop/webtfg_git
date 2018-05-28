import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TerminalU } from '../terminalU';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { escape } from 'querystring';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
import { Generalform } from '../generalform';

@Component({
  selector: 'app-terminal-form',
  templateUrl: './terminal-form.component.html',
  styleUrls: ['./terminal-form.component.css'],
})

export class TerminalFormComponent extends Generalform implements OnInit{
  protected object:TerminalU = {};
  private pwd_confirmation:string;
  private hide:boolean = true;
  private hideConf:boolean = true;
  private eventDescSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(protected route: ActivatedRoute, protected location: Location, private dialog: MatDialog, protected generalService:GeneralService) {
    super(generalService, route, location);
  }

  onOpenDialog() {
    const dialogRef = this.dialog.open(HelpDialogComponent);
  }
  getObject(){
    this.generalService.crud(ConsSettings.SINGLE_GET, ConsSettings.URL_TERMINALS, this.id_url).subscribe(terminal => {
      this.objectSubject.next(terminal);
      this.titleSubject.next(this.object.terminal_description);
      this.navLinks[3]['label'] = ConsSettings.title_terminal + " "+this.object.terminal_description;
      this.navLinks[3]['path'] = "/"+ConsSettings.path_terminal_form+"/"+this.object.terminal_id;
      this.navLinks[1]['path'] = "/"+ConsSettings.path_event_form+"/" + this.object.event_id;
      this.navLinks[2]['path'] = "/"+ConsSettings.path_terminal_component+"/" + this.object.event_id;
      this.generalService.getEventDescription(this.object.event_id).subscribe(value => {
        this.navLinks[1]['label'] +=value;
      });
      this.loading = false;
    });
  }

  ngOnInit() {
    this.navLinks = [
      {
        label: ConsSettings.title_event_s,
        path: "/"+ConsSettings.path_event_component
      },
      {
        label: ConsSettings.title_event,
        path: ""
      },
      {
        label: ConsSettings.title_terminal_s,
        path: "/"+ConsSettings.path_terminal_component
      },
      {
        label: "",
        path: "",
        queryParam: ""
      }  
    ];
    this.URL = ConsSettings.URL_TERMINALS;
    this.object_id_name = ConsSettings.attr_terminal_id;

    this.pwd_confirmation="";
    this.doIt();
    this.navLinks[3]['path']="/"+ConsSettings.path_terminal_form+"/"+this.id_url;
  }

  getNewForm(){
    let term_title = "Nuevo terminal";
    this.titleSubject.next(term_title);
    this.navLinks[3]['label'] = term_title;
    this.loading = false;
  }

  onOpenDialogPassword(event):void {
    let dialogRef = this.dialog.open(PasswordDialogComponent, {
      data: { component: +ConsSettings.path_terminal_form }});

    dialogRef.afterClosed().subscribe(result => {
      this.object.terminal_password = result.new_password;
    });
  }

  readParams(params){
    if (params.event_id != undefined) {
      this.navLinks[3]['queryParam'] = {'event_id': params.event_id};
      this.object.event_id = params.event_id;
      this.navLinks[2]['path'] = "/"+ConsSettings.path_terminal_component+"/"+params.event_id;
      this.generalService.getEventDescription(params.event_id).subscribe(value => {
        this.navLinks[1]['label'] +=value;
        this.navLinks[1]['path'] = "/"+ConsSettings.path_event_form+"/" + params.event_id;
      });
    }
  }
}
