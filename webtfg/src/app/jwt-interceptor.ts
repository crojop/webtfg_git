import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpClient, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general.service';
import 'rxjs/add/operator/do';
import { Injectable, Injector, ReflectiveInjector } from '@angular/core';
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConsSettings } from './cons-settings';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private generalService:GeneralService;
    private isRefreshingToken: boolean = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private injector:Injector;
    constructor(public inj: Injector) {
      this.injector = inj;
    }
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { 'x-access-token': token }});
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      this.generalService = this.injector.get(GeneralService);
      return next.handle(this.addToken(req, this.generalService.getAuthToken()))
          .catch(error => {
              console.log(error);
              if (error instanceof HttpErrorResponse) {
                  switch ((<HttpErrorResponse>error).status) {
                      case ConsSettings.CODE_FORBIDDEN:
                          return this.handle909Error(req, next);
                  }
              } else {
                  return Observable.throw(error);
              }
          });
  }

    public handle909Error(req: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;
        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);

        return this.generalService.refreshToken()
            .switchMap((newToken: string) => {
                if (newToken) {
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addToken(req, newToken));
                }

                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser();
            })
            .catch(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.logoutUser();
            })
            .finally(() => {
                this.isRefreshingToken = false;
            });
    }
      else {
        return this.tokenSubject
            .filter(token => token != null)
            .take(1)
            .switchMap(token => {
                return next.handle(this.addToken(req, token));
            });
    }
  }
  logoutUser() {
    // Route to the login page (implementation up to you)
    return Observable.throw("");
}
}
