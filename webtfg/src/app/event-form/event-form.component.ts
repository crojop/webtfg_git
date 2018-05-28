import { Component, OnInit } from '@angular/core';
import { EventU } from '../eventU';
import { IMyDrpOptions, IMyDateRangeModel, IMyDate } from 'mydaterangepicker'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatePipe } from '@angular/common'
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
import { Generalform } from '../generalform';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent extends Generalform implements OnInit {
  protected object:EventU = {};
  private model: any;
  private rangeDate:string = "";
  
  constructor(protected datepipe: DatePipe, protected route: ActivatedRoute, protected location: Location, protected generalService:GeneralService) {
    super(generalService, route, location);
  }

  ngOnInit(){
    this.navLinks = [
      {
        label: ConsSettings.title_event_s,
        path: "/"+ConsSettings.path_event_component
      },
      {
        label: "",
      }
    ];
    this.URL = ConsSettings.URL_EVENTS;
    this.object_id_name = ConsSettings.attr_event_id;
    this.titleSubject.subscribe(value => {
      this.title = value;
      this.navLinks[1].label=value}
    );
    this.doIt();
  }

  readParams(params){
    if (params.action != ConsSettings.action_edit) this._data.next(true);
  }

  getNewForm(){
    this.titleSubject.next("Nuevo evento");
    this.loading = false;
  }

  getObject(): void {
    this.generalService.crud(ConsSettings.SINGLE_GET, ConsSettings.URL_EVENTS, this.id_url).subscribe(event=>{
      this.objectSubject.next(event);
      this.titleSubject.next(ConsSettings.title_event+" "+this.object.event_description);
      this.chargeCalendar();
      this.loading = false;
    });
  }
  chargeCalendar(){
    let fechaBegin: Date = new Date(this.object[ConsSettings.attr_event_start_date]);
    let fechaEnd: Date = new Date(this.object[ConsSettings.attr_event_end_date]);

    let dateBegin:IMyDate = {year: fechaBegin.getFullYear(), month: fechaBegin.getMonth()+1, day: fechaBegin.getUTCDate()};
    let dateEnd:IMyDate = {year: fechaEnd.getFullYear(), month: fechaEnd.getMonth()+1, day: fechaEnd.getUTCDate()};
    
    this.rangeDate = dateBegin.day +"."+dateBegin.month+"."+dateBegin.year+" - "+dateEnd.day+"."+dateEnd.month+"."+dateEnd.year;
    
    this.model = { beginDate: dateBegin, endDate: dateEnd};

    this.object[ConsSettings.attr_event_start_date] = this.datepipe.transform(fechaBegin, ConsSettings.DATE_FORMAT);
    this.object[ConsSettings.attr_event_end_date] = this.datepipe.transform(fechaEnd, ConsSettings.DATE_FORMAT);
  }
}
