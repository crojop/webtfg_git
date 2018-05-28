import { Component, OnInit } from '@angular/core';
import { UserU } from '../userU';
import { TagU } from '../tagU';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
import { Generalform } from '../generalform';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends Generalform implements OnInit {
  protected object:UserU = {};
  private tag:TagU = {};
  
  constructor(protected route: ActivatedRoute, protected location: Location, protected generalService:GeneralService) {
    super (generalService, route, location);
  }

  ngOnInit() {
    this.navLinks = [
      { label: ConsSettings.title_user_s,
        path: "/"+ConsSettings.path_user_component,},
      { label: "" }
    ];
    this.URL = ConsSettings.URL_USERS;
    this.object_id_name = ConsSettings.attr_user_id;
    this.titleSubject.subscribe(value => {
      this.title = value;
      this.navLinks[1].label=value}
    );
    this.doIt();
  }

  getObject(){
    this.generalService.crud(ConsSettings.SINGLE_GET, ConsSettings.URL_USERS, this.id_url).subscribe(user => {
      this.objectSubject.next(user);
      this.titleSubject.next(ConsSettings.title_user + " " + this.object.user_description);
      this.loading = false;
    });
  }

  getNewForm(){
    this.titleSubject.next("Nuevo asistente");
    this.loading = false;
  }

  addUser():void{
  }

}
