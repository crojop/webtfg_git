import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../general.service';
import { ConsSettings } from '../cons-settings';
import { TerminalU } from '../terminalU';
import { Generalform } from '../generalform';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Generalform implements OnInit {
  protected object:TerminalU = {};
  private registeredTitle:string = "Usuario registrado correctamente";
  model: any = {};
  loading = false;
  title = "Registrarse";

  constructor(protected route: ActivatedRoute, protected location: Location, protected generalService:GeneralService) {
    super(generalService, route, location);
  }

  register() {
      this.loading = true;
  }
  ngOnInit() {
    this.id_url = 0;
    this.URL = ConsSettings.URL_TERMINALS;
    this.regAlrBehaviourSubject.subscribe(value => this.regAlreadyExist = value);
    this.objectSubject.subscribe(value=> this.object = value);
  }
}
