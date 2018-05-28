import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  private isConfiguration:boolean = false;
  private title:string = "Cambiar contraseña";
  private hide:Boolean = true;
  private hideConf:Boolean = true;
  private new_password:string;
  private new_password_conf:string;
  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) {}
    change(){ this.hide = !this.hide; }

    changeConf(){ this.hideConf = !this.hideConf; }
  
    isValid(){
      return (this.new_password == undefined||this.new_password.length>=6);
    }
  
    isValidConf(){
      return (this.new_password == undefined || this.new_password_conf == undefined || this.new_password_conf == this.new_password );
    }
}
