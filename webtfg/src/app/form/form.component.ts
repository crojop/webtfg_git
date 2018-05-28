import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TerminalU } from '../terminalU';
import { ObjectU } from '../objectU';
import { FileHolder } from 'angular2-image-upload';
import { IMyDrpOptions, IMyDateRangeModel, IMyDate } from 'mydaterangepicker';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Password } from '../password';
import { ConsSettings } from '../cons-settings';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Password implements OnInit, OnChanges {
  @Input('object') object:ObjectU;
  @Input('objectElement') objectElement;
  @Input('idUrl') idUrl;
  @Input('terminalId') terminalId;
  @Input('uploadedFiles') uploadedFiles;
  @Input('rangeDate') rangeDate;
  @Input('model') model;
  @Input('regAlreadyExist') regAlreadyExist;
  @Input('title') title;
  @Input('submitted') submitted;

  @Output() onOpenDialogAddUser = new EventEmitter<any>();
  @Output() onDisassociateUser = new EventEmitter<any>();
  @Output() onOpenDialogPassword = new EventEmitter<any>();
  @Output() onOpenDialog = new EventEmitter<any>();
  @Output() onSubmitChild = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();

  @ViewChild('elementForm') elementForm;
  private objIdValue:string = null;
  private uniqueAttr;
  private registeredTitle = "";
  private numbers = [];
  private arrayTitles = [];
  private arrayAttributes = []; 
  private arrayErrorMessages = []; 
  private routerLink = "";
  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    dayLabels: {su: 'D', mo: 'L', tu: 'M', we: 'X', th: 'J', fr: 'V', sa: 'S'},
    monthLabels : { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' }
  };
  constructor(private datepipe: DatePipe) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['regAlreadyExist'] && changes['regAlreadyExist'].previousValue!=undefined) {
      this.elementForm.form.controls[this.uniqueAttr].setErrors({'alreadyExist': true});
    }
  }

  edit(){
    this.onEdit.emit();
  }

  ngOnInit() {
   switch (this.objectElement) {
      case ConsSettings.USER_U : {
        this.uniqueAttr = ConsSettings.attr_user_description;
        this.arrayTitles = ["Nombre y apellidos", "Nombre de usuario"];
        this.arrayAttributes = [ConsSettings.attr_user_name, ConsSettings.attr_user_description]; 
        this.arrayErrorMessages = ["El nombre y apellidos del usuario son obligatorios", "El alias o nombre de usuario es obligatorio"]; 
        this.routerLink = "/"+ConsSettings.path_user_component;
        this.registeredTitle = "Usuario registrado correctamente";
        break;
      }
      case ConsSettings.TAG_U : {
        this.objIdValue = this.object[ConsSettings.attr_tag_code];
        this.uniqueAttr = ConsSettings.attr_tag_code;
        this.arrayTitles = ["Código de la pulsera", "Descripción de la pulsera"];
        this.arrayAttributes = [ConsSettings.attr_tag_code, ConsSettings.attr_tag_description]; 
        this.arrayErrorMessages = ["El código de la pulsera es obligatorio", "La descripción o nombre de la pulsera es obligatoria"]; 
        this.routerLink = "/"+ConsSettings.path_tag_component+"/"+this.object[ConsSettings.attr_event_id];
        this.registeredTitle = "Pulsera registrada correctamente";
        break;
      }
      case ConsSettings.TERMINAL_U : {
        this.uniqueAttr = ConsSettings.attr_terminal_serial_number;
        this.arrayTitles = ["Número de serie del terminal", "Descripción del terminal", "Tipo de terminal"];
        this.arrayAttributes = [ConsSettings.attr_terminal_serial_number, ConsSettings.attr_terminal_description, ConsSettings.attr_terminal_type]; 
        this.arrayErrorMessages = ["El número de serie es obligatorio", "La descripción del terminal es obligatoria",
        "El tipo de terminal es obligatorio"]; 
        this.routerLink = "/"+ConsSettings.path_terminal_component+"/"+this.object[ConsSettings.attr_event_id];
        this.registeredTitle = "Terminal registrado correctamente";
        break;
      }
      case ConsSettings.PRODUCT_U : {
        this.uniqueAttr = ConsSettings.attr_resource_title;
        this.arrayTitles = ['Título', 'Descripción', 'Precio', 'Imagen del producto'];
        this.arrayAttributes = [ConsSettings.attr_resource_title, ConsSettings.attr_resource_description, ConsSettings.attr_resource_price];
        this.arrayErrorMessages = ['El título del producto es obligatorio', 'La descripción del producto es obligatoria', 'El precio es obligatorio'];
        this.routerLink = "/"+ConsSettings.path_product_component+"/"+this.terminalId;
        this.registeredTitle = "Producto registrado correctamente";
        this.object[ConsSettings.attr_image] = this.uploadedFiles;
        break;
      }
      case ConsSettings.EVENT_U : {
        this.uniqueAttr = ConsSettings.attr_event_description;
        this.arrayTitles = ['Nombre'];
        this.arrayAttributes = [ConsSettings.attr_event_description];
        this.arrayErrorMessages = ['El nombre es obligatorio'];
        this.routerLink = "/"+ConsSettings.path_event_component;
        this.registeredTitle = this.object[ConsSettings.attr_event_description];
        break;
      }
      case "register" : {
        this.uniqueAttr = ConsSettings.attr_terminal_serial_number;
        this.arrayTitles = ['Usuario'];
        this.arrayAttributes = [ConsSettings.attr_terminal_serial_number];
        this.arrayErrorMessages = ['El usuario es obligatorio'];
        this.routerLink = "/"+ConsSettings.path_login;
        this.registeredTitle = "Usuario registrado correctamente";
        break;
      }
      default : {
        break;
      }
    }
    let length = this.arrayAttributes.length;
    this.numbers = Array.from(Array(length),(x,i)=>i);
  }

  openDialogAddUser(tag:ObjectU){
    this.elementForm.form.markAsDirty();
    this.onOpenDialogAddUser.emit(tag);
  }

  disassociateUser(tag:ObjectU){
    this.elementForm.form.markAsDirty();
    this.onDisassociateUser.emit(tag);
  }

  openDialogPassword(event):void {
    this.elementForm.form.markAsDirty();
    this.onOpenDialogPassword.emit(event);
  }

  onSubmit(){
    this.elementForm.form.markAsPristine();
    let arr_submit = {
      "object": this.object,
      "objIdValue": this.objIdValue
    }
    this.onSubmitChild.emit(arr_submit);
  }

  onUploadFinished(file: FileHolder) {
    this.elementForm.form.markAsDirty();
    this.object[ConsSettings.attr_files] = file.file;
    this.createImageFromBlob(file.file);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.object[ConsSettings.attr_image] = [reader.result];
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  openDialog(){
    this.onOpenDialog.emit();
  }

  onDateRangeChanged(event:IMyDateRangeModel) {
    this.elementForm.form.markAsDirty();
    this.rangeDate = event.beginDate.day +"."+event.beginDate.month+"."+event.beginDate.year+" - "+event.endDate.day+"."+event.endDate.month+"."+event.endDate.year;
    
    let fechaIni = new Date();
    fechaIni.setMonth(event.beginDate.month-1);
    fechaIni.setFullYear(event.beginDate.year);
    fechaIni.setUTCDate(event.beginDate.day);
    this.object[ConsSettings.attr_event_start_date] = this.datepipe.transform(fechaIni, ConsSettings.DATE_FORMAT);

    let fechaFin = new Date();
    fechaFin.setMonth(event.endDate.month-1);
    fechaFin.setFullYear(event.endDate.year);
    fechaFin.setUTCDate(event.endDate.day);
    this.object[ConsSettings.attr_event_end_date] = this.datepipe.transform(fechaFin, ConsSettings.DATE_FORMAT);
  }

}