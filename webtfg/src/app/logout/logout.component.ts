import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsSettings } from '../cons-settings';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.router.navigate(['/'+ConsSettings.path_login]);
  }

}
