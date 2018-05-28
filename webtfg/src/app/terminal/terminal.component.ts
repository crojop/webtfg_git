import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatPaginator, MatSort,MatInput, MatTableDataSource } from '@angular/material';
import { TerminalU } from '../terminalU';
import { SelectionModel } from '@angular/cdk/collections';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  private queryParams = {};
  private arr_terminals:TerminalU[] = [];
  private event_id:number;
  private event_description:string = "";
  myDataSource;
  private title:string = "";
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.title);
  private dataSubject: BehaviorSubject<TerminalU[]> = new BehaviorSubject<TerminalU[]>(this.arr_terminals);
  private eventDescriptionSubject : BehaviorSubject<string> = new BehaviorSubject<string>(this.event_description);
  private eventIdSubject : BehaviorSubject<number> = new BehaviorSubject<number>(this.event_id);
  private loading:Boolean = true;
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
      label: ConsSettings.title_terminal_s,
      path: "/"+ConsSettings.path_terminal_component
    }

  ];
  private activeLinkIndex = -1;
  constructor(private route: ActivatedRoute, private location: Location, private dialog: MatDialog, private generalService:GeneralService) {
  }

  ngOnInit(){
    this.titleSubject.subscribe(value => this.title=value);
    this.titleSubject.next(ConsSettings.title_terminal_s);
    this.eventDescriptionSubject.subscribe(value => {
      this.event_description = value;
      this.navLinks[1].label = ConsSettings.title_event + " " + value});
    this.eventIdSubject.subscribe(value => {
      this.event_id = value;
      this.queryParams = { "event_id": this.event_id };
      this.navLinks[1].path="/"+ConsSettings.path_event_form+"/"+value;
      this.navLinks[2].path="/"+ConsSettings.path_terminal_component+"/"+value;
    }
    );
    this.eventIdSubject.next(+this.route.snapshot.paramMap.get(ConsSettings.attr_event_id));
    this.myDataSource = new MatTableDataSource(this.dataSubject.value);
    if (this.event_id>0) this.chargeTerminals();
  }

  chargeTerminals(){
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_TERMINALS+"?"+ConsSettings.attr_event_id+"="+this.event_id).subscribe(res => { 
      this.arr_terminals = res;
      this.myDataSource.data = this.arr_terminals;
      this.generalService.getEventDescription(this.event_id).subscribe ( event_desc => {
        this.eventDescriptionSubject.next(event_desc);
        this.loading = false;
      });
    });
  }

  onDeleted(row:any){
    this.generalService.crud(ConsSettings.DELETE, ConsSettings.URL_TERMINALS, row.terminal_id).subscribe(response => {
      if(!response[ConsSettings.Error]) this.chargeTerminals();}
    );
  }
  
}
