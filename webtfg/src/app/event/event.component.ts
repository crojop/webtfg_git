import { Component, OnInit } from '@angular/core';
import { EventU } from '../eventU';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
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
  private arr_events:EventU[] = [];
  private loading:Boolean = true;
  constructor(private dialog: MatDialog, private generalService:GeneralService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(){
    this.chargeEvents();
  }
  openDialog(eventClick, event:EventU) {
    eventClick.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: event.event_description,
      element: ConsSettings.EVENT_U }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteEvent(event.event_id);
    });
  }

  chargeEvents(){
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_EVENTS).subscribe( res => {
      this.arr_events = res;
      this.loading = false;
    });
  }

  deleteEvent(event_id:number){
    this.generalService.crud(ConsSettings.DELETE, ConsSettings.URL_EVENTS, event_id).subscribe(response => {
      if(!response[ConsSettings.Error]) this.chargeEvents();}
    );
  }

  clickEdit(eventClick, event_id:number){
    eventClick.stopPropagation();
    this.router.navigate([ConsSettings.path_event_form+'/'+event_id], { queryParams: { action: ConsSettings.action_edit } });
  }

}

