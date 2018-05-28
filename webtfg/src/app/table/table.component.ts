import { Component, OnInit, ViewChild, Input, EventEmitter, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ObjectU } from '../objectU';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { GeneralService } from '../general.service';
import { ConsSettings } from '../cons-settings';
import { TagU } from '../tagU';
import { UserU } from '../userU';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  ngClass={};
  ngClassElement = {};
  @Input('myDataSource') myDataSource;
  @Input('objectElement') objectElement;
  @Input('queryParams') queryParams;
  @Input('userSelected') userSelected;
  @Input('arrProducts') arrProducts;
  @Output() onDeleted = new EventEmitter<any>();
  @Output() onOpenDialogAddUser = new EventEmitter<any>();
  @Output() onDisassociateUser = new EventEmitter<any>();
  @Output() onSelectedRow = new EventEmitter<any>();
  routerLink;
  numbers;
  private displayedColumns = [];
  private arrayTitles = [];
  private idAttribute:string = "";
  private descAttribute:string = "";
  private addTitle = "";
  private user:UserU = {};
  private selectedYet:boolean = false;
  private user_selected:UserU = {};
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  selection = new SelectionModel<any>(true, []);
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private generalService:GeneralService) { }
  
  selectedRow(user:any){
   if (this.user_selected == user) {
      this.selectedYet = false;
      delete (this.user_selected);
    } else {
      this.selectedYet = true;
      this.user_selected = user;
    }
    this.onSelectedRow.emit(this.user_selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['arrProducts']) this.myDataSource.data = changes['arrProducts'].currentValue;
  }

  ngOnInit() {
    if (this.userSelected!=undefined) this.user_selected = this.userSelected;
    switch (this.objectElement) {
      case ConsSettings.USER_U : {
        this.addTitle = "asistente";
        this.idAttribute = ConsSettings.attr_user_id;
        this.descAttribute = ConsSettings.attr_user_description;
        this.arrayTitles = ['Id', 'Nombre y apellidos', 'Nombre de usuario'];
        this.displayedColumns = [ConsSettings.attr_user_id, ConsSettings.attr_user_name, ConsSettings.attr_user_description, 'edit_delete'];
        break;
      }
      case ConsSettings.TERMINAL_U : {
        this.addTitle = "terminal";
        this.idAttribute = ConsSettings.attr_terminal_id;
        this.descAttribute = ConsSettings.attr_terminal_serial_number;
        this.arrayTitles = ['Id', 'Número de serie del terminal', 'Descripción del terminal'];
        this.displayedColumns = [ConsSettings.attr_terminal_id, ConsSettings.attr_terminal_serial_number, ConsSettings.attr_terminal_description, 'products', 'edit_delete'];
        break;
      }
      case ConsSettings.TAG_U : {
        this.addTitle = "pulsera";
        this.idAttribute = ConsSettings.attr_tag_code;
        this.descAttribute = ConsSettings.attr_tag_description;
        this.arrayTitles = ['Id', 'Código del tag', 'Descripción del tag', 'Saldo', 'Usuario asociado'];
        this.displayedColumns = [ConsSettings.attr_tag_id, ConsSettings.attr_tag_code, ConsSettings.attr_tag_description, ConsSettings.attr_balance, 'user_description_tag', 'edit_delete' ];
        break;
      }
      case ConsSettings.PRODUCT_U : {
        this.addTitle = "producto";
        this.idAttribute = ConsSettings.attr_resource_id;
        this.descAttribute = ConsSettings.attr_resource_title;
        this.arrayTitles = ['Id', 'Nombre', 'Descripción', 'Precio', 'Imagen'];
        this.displayedColumns = [ConsSettings.attr_resource_id, ConsSettings.attr_resource_title, ConsSettings.attr_resource_description, ConsSettings.attr_resource_price, ConsSettings.attr_image, 'edit_delete'];
        break;
      }
      case "associate_user" : {
        this.arrayTitles = ['Id', 'Descripción', 'Nombre y apellidos', ''];
        this.displayedColumns = [ConsSettings.attr_user_id, ConsSettings.attr_user_name, ConsSettings.attr_user_description, 'select'];
        break;
      }
      default : {
        break;
      }
    }
    let length = this.displayedColumns.length-((this.objectElement == ConsSettings.USER_U || this.objectElement == "associate_user") ? 1 : 2);
    this.numbers = Array.from(Array(length),(x,i)=>i);
  }

  ngAfterViewInit(){
    this.myDataSource.paginator = this.paginator;
    this.myDataSource.sort = this.matSort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.myDataSource.filter = filterValue;
  }

  edit(row){
    let qp = {};
    if (this.objectElement == ConsSettings.TERMINAL_U) {
      qp = { queryParams: { 'event_id' : row.event_id} };
    } else if (this.objectElement == ConsSettings.PRODUCT_U) {
      qp = { queryParams: { 'terminal_id' : this.queryParams[ConsSettings.attr_terminal_id]} };
    }
    this.router.navigate([this.objectElement+'-form'+'/'+row[this.idAttribute]], qp);
  }

  openDialog(row:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: row[this.descAttribute], element: this.objectElement }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteObjectU(row);
    });
  }

  deleteObjectU(row:any){
    this.onDeleted.emit(row);
  }

  addObject(){
    let route = (this.objectElement==ConsSettings.USER_U) ? "" : "/0";
    let queryString = (this.queryParams!=undefined) ? { queryParams: this.queryParams } : {};
    this.router.navigate([this.objectElement+'-form' + route ], queryString);
  }

  openDialogAddUser(tag:any){
    this.onOpenDialogAddUser.emit(tag);
  }

  disassociateUser(tag:TagU){
    this.onDisassociateUser.emit(tag);
  }

}
