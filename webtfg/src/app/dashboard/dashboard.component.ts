import { Component, OnInit, ViewChild } from '@angular/core';
import { EventU } from '../eventU';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { ConsSettings } from '../cons-settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private navLinks = [
    {
      label: ConsSettings.title_event_s,
      path: "/"+ConsSettings.path_event_component
    }, {
      label: ConsSettings.title_user_s,
      path: "/"+ConsSettings.path_user_component,
    }
  ];
  private activeLinkIndex = -1;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(){
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.router.navigate(['/'+ConsSettings.path_login]);
  }
}
