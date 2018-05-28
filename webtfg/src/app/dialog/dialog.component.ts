import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserComponent } from '../user/user.component'
import { ConsSettings } from '../cons-settings';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {
  private arr_data:any;
  private title:string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.arr_data=data;
      this.getTitle();
  }
  getTitle():void{
    this.title="Eliminar el ";
    switch(this.arr_data.element) { 
      case ConsSettings.USER_U: { 
        this.title+="asistente ";
        break; 
      } 
      case ConsSettings.TERMINAL_U: { 
        this.title+="terminal ";
        break; 
      } 
      case ConsSettings.PRODUCT_U: { 
        this.title+="producto ";
        break; 
      }
      case ConsSettings.TAG_U: { 
        this.title+="tag ";
        break; 
      }
      case ConsSettings.EVENT_U: { 
        this.title+="evento ";
        break; 
      } 
      default: { 
        this.title = "";
        break; 
      } 
   }
   this.title += this.arr_data.name;
  }

}
