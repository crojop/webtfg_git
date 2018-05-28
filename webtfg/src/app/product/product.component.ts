import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductU } from '../productU';
import {MatPaginator, MatSort,MatInput, MatTableDataSource } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ResponseContentType } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
// Importar la clase Observable desde la librería rxjs
import { Observable }     from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TerminalU } from '../terminalU';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  private queryParams = {};
  noTable=false;
  arr_products:ProductU[] = [];
  myDataSource;
  private title:string = "";
  private id_url:number = null;
  private terminal:TerminalU ={};
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.title);
  private terminalSubject: BehaviorSubject<TerminalU> = new BehaviorSubject<TerminalU>(this.terminal);
  private dataSubject: BehaviorSubject<ProductU[]> = new BehaviorSubject<ProductU[]>(this.arr_products);
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
    },
    {
      label: ConsSettings.title_product_s,
      path: ""
    }

  ];
  private activeLinkIndex = -1;
  constructor(private dialog: MatDialog, private generalService:GeneralService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit (){
    this.titleSubject.subscribe(value => this.title = value);
    this.titleSubject.next(ConsSettings.title_product_s);
    this.terminalSubject.subscribe(value => this.terminal=value);
    this.myDataSource = new MatTableDataSource(this.dataSubject.value);
    this.id_url = +this.route.snapshot.paramMap.get(ConsSettings.attr_terminal_id);
    this.queryParams = { 'terminal_id': this.id_url };
    if (this.id_url>0) this.chargeProducts();
    else this.noTable = true;
  }

  getImages(products:any){
    for (let product of products){
      this.generalService.getImage(product.resource_img).subscribe
      (  image => { 
        this.createImageFromBlob(image, product);
        this.loading = false;
      });
    }
  }
  createImageFromBlob(image: Blob, product:ProductU) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      product.image = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

  chargeProducts(){
    this.navLinks[3].path = '/'+ConsSettings.path_product_component+'/' + this.id_url;
    this.generalService.getTerminalDescription(this.id_url).subscribe(terminal => {
      this.terminalSubject.next(terminal);
      this.queryParams = { 'terminal_id': terminal.terminal_id };
      this.navLinks[3].label = ConsSettings.title_product_s+" " + this.terminal.terminal_description;
      this.navLinks[1].path = '/'+ConsSettings.path_event_form+'/' + this.terminal.event_id;
      this.navLinks[2].path = '/'+ConsSettings.path_terminal_component+'/' + this.terminal.event_id;
      this.generalService.getEventDescription(this.terminal.event_id).subscribe(event_desc => {
        this.navLinks[1].label = ConsSettings.title_event+" "+ event_desc;
      });
      this.getProducts();
    })
  }

  getProducts(){
    this.generalService.crud(ConsSettings.PLURAL_GET, ConsSettings.URL_PRODUCTS+this.terminal.terminal_serial_number).subscribe(
      value => { 
        this.arr_products = value;
        this.myDataSource.data = this.arr_products;
        this.noTable = true;
        if (value.length>0) this.getImages(value);
        this.loading = false;
      }
    );
  }
  
  onDeleted(row:any){
    this.generalService.crud(ConsSettings.DELETE, ConsSettings.URL_RESOURCES, row.resource_id).subscribe(response => 
      {
        if(response[ConsSettings.Error]== false) this.getProducts();
      }
    );
  }

}