import { Component, OnInit } from '@angular/core';
import { ProductU } from '../productU';
import { FileHolder } from "angular2-image-upload";
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from '../cons-settings';
import { GeneralService } from '../general.service';
import { Generalform } from '../generalform';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends Generalform implements OnInit {
  protected object:ProductU;
  private file;
  private uploaded_files:File[];
  protected terminal_id:number = null;
 
  constructor(private http: Http, protected route: ActivatedRoute, protected location: Location, protected generalService:GeneralService) {
    super(generalService, route, location);    
  }

  getObject(): void {
    this.generalService.crud(ConsSettings.SINGLE_GET, ConsSettings.URL_RESOURCES, this.id_url).subscribe(product => {
      this.objectSubject.next(product);
      let prod_title = ConsSettings.title_product + " " + product.resource_title;
      this.titleSubject.next(prod_title)
      this.navLinks[4].label = prod_title;
      this.navLinks[4].path = '/'+ConsSettings.path_product_form+'/' + product.resource_id;
      this.generalService.getUploadedImage(this.object.resource_img).subscribe (response => {
        this.createImageFromBlob(response);
      });     
    });
  }

  getNewForm(){
    let prod_title = "Nuevo producto";
    this.titleSubject.next(prod_title);
    this.navLinks[4].label = prod_title;
    this.navLinks[4].path = '/'+ConsSettings.path_product_form+'/0';
    this.object = {};
    this.uploaded_files = [];
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.uploaded_files = [reader.result];
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
    this.loading = false; 
 }

  ngOnInit() {
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
        label: ConsSettings.title_terminal_s,
        path: "/"+ConsSettings.path_terminal_component
      },
      {
        label: ConsSettings.title_product_s,
        path: ""
      },
      {
        label: ConsSettings.title_product + " ",
        path: ""
      }
    ];
    this.object_id_name = ConsSettings.attr_resource_id;
    this.doIt();   
  }

  readParams(params){
    if (params.terminal_id != undefined) {
      this.terminal_id = params.terminal_id;
      this.generalService.getTerminalDescription(this.terminal_id).subscribe(terminal => {
        let product:ProductU = {};
        product.terminal_type = terminal[ConsSettings.attr_terminal_type];
        product.event_id = terminal[ConsSettings.attr_event_id];
        this.objectSubject.next(product);
        this.navLinks[3]['label'] = ConsSettings.title_product_s + " " + terminal[ConsSettings.attr_terminal_description];
        this.navLinks[3]['path'] = '/'+ConsSettings.path_product_component+'/' + terminal[ConsSettings.attr_terminal_id];
        this.navLinks[2]['path'] = '/'+ConsSettings.path_terminal_component+'/'+terminal[ConsSettings.attr_event_id];
        this.navLinks[1]['path'] = '/'+ConsSettings.path_event_form+'/' + terminal[ConsSettings.attr_event_id];
        this.generalService.getEventDescription(terminal[ConsSettings.attr_event_id]).subscribe(value => {
          this.navLinks[1]['label'] +=value;
        });
      });
    }
  }
  
  onUploadFinished(file: FileHolder) {
    this.object.files = file.file;
  }

  onSubmitChild(arr_submit) {
    if (arr_submit!=undefined){
      let product = arr_submit["object"];
      let formData:FormData = new FormData();
      if (product.files != undefined) formData.append(ConsSettings.attr_files, product.files, product.files['name']);
      formData.append(ConsSettings.attr_resource_title, product.resource_title);
      formData.append(ConsSettings.attr_resource_description, product.resource_description);
      formData.append(ConsSettings.attr_resource_price, product.resource_price);
      
      if (this.id_url>0) {
        this.generalService.crud(ConsSettings.PUT, ConsSettings.URL_RESOURCES, product.resource_id, formData).subscribe(response => 
          this.manageResponse(response));
      }
      else {
        formData.append(ConsSettings.attr_terminal_type, product.terminal_type);
        formData.append(ConsSettings.attr_event_id, product.event_id);
        this.generalService.crud(ConsSettings.POST, ConsSettings.URL_RESOURCES, undefined, formData).subscribe(response => 
          this.manageResponse(response));
      }
    }
  }

}
