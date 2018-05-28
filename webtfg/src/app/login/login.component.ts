import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Password } from '../password';
import { ConsSettings } from '../cons-settings';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent extends Password implements OnInit {
    @ViewChild('f') f;
    model: any = {};
    loading = false;
    returnUrl: string;
    private errorUsername:boolean = false;
    private errorPassword:boolean = false;

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
        super();
    }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.errorPassword = false;
        this.errorUsername = false;
        this.f.form.markAsPristine();
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    switch (data) {
                        case ConsSettings.CODE_SUCCESS: {
                            this.router.navigate([this.returnUrl]);
                            break;
                        }
                        case ConsSettings.CODE_USERNAME_ERROR: {
                            this.errorUsername = true;
                            break;
                        }
                        case ConsSettings.CODE_PASSWORD_ERROR: {
                            this.errorPassword = true;
                            break;
                        }
                         default: { break; }
                    }
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    cancel(){
        this.f.form.reset();
        this.loading = false;
    }
}