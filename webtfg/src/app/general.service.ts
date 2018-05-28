import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';
import { EventU } from './eventU';
import { TerminalU } from './terminalU';
import { ObjectU } from './objectU';
import { ConsSettings } from './cons-settings';
@Injectable()
export class GeneralService {
  public tokenSubject: BehaviorSubject<string>;
  protected headers:HttpHeaders;
  public tokenObservable:Observable<string>;
  public authTokenStale: string;
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;

  constructor(protected http:HttpClient) {
    this.authTokenStale = atob(JSON.parse(localStorage.getItem(ConsSettings.CURRENT_USER)).token);
    this.currentToken = this.authTokenStale;
  }

  public getAuthToken():string {
    return this.currentToken;
  }

  parseEvDesResponse(response):string{
    let event_desc:string = "";
    if (!response.Error) {
      event_desc = response.Data[0][ConsSettings.attr_event_description];
    } 
    return event_desc;
  }

  parseTerminalResponse(response):TerminalU{
    let terminal:TerminalU = {};
    if (!response.Error) {
      terminal = response.Data[0];
    } 
    return terminal;
  }

  public getEventDescription (event_id:number){
    return this.http.get(ConsSettings.URL_EVENTS+event_id).map(response => this.parseEvDesResponse(response));
  }

  public getTerminalDescription (terminal_id:number){
    return this.http.get(ConsSettings.URL_TERMINALS+terminal_id).map(response => this.parseTerminalResponse(response));
  }

  refreshToken(): Observable<string> {
    let body = {
      user: atob(JSON.parse(localStorage.getItem(ConsSettings.CURRENT_USER)).user),
      password: atob(JSON.parse(localStorage.getItem(ConsSettings.CURRENT_USER)).password)
    };
    return this.http.post(ConsSettings.URL_AUTH, body).pipe(
      map(response => response[ConsSettings.Token]),
      tap(newToken => {
        let localStor = JSON.parse(localStorage.getItem(ConsSettings.CURRENT_USER));
        localStor.token = btoa(newToken);
        localStorage.setItem(ConsSettings.CURRENT_USER, JSON.stringify(localStor));
        this.authTokenNew=newToken;
        this.currentToken = this.authTokenNew}
      )
    )  
  }

  parseSingleGetResponse(response):any{
    let object:any;
    if (!response.Error) {
      object = response.Data[0];
    } 
    return object;
  }

  parsePluralGetResponse(response):any[]{
    let arr_object:any[] = [];
    if (!response.Error) {
      for (let i=0; i<response.Data.length; i++){
        arr_object.push(response.Data[i]);
      }
    }
    return arr_object;
  }

  crud(method:string, url:string, id?:number|string, object?:ObjectU){
    let req;
    switch (method){
      case ConsSettings.PUT: {
        req= this.http.put(url+id, object);
        break;
      }
      case ConsSettings.POST: {
        req = this.http.post(url, object);
        break;
      }
      case ConsSettings.DELETE: {
        req = this.http.delete(url+id);
        break;
      }
      case ConsSettings.SINGLE_GET: {
        req = this.http.get(url+id).map( response => this.parseSingleGetResponse(response));
        break;
      }
      case ConsSettings.PLURAL_GET: {
        req = this.http.get(url).map(response => this.parsePluralGetResponse(response));
        break;
      }
      default: break;
    }

    if (req!=undefined) {
      return req;
    }
  }

  getUploadedImage(res_img):Observable<any>{
    return this.http.get(ConsSettings.URL_IMAGES+res_img, {responseType: "blob"});
  }

  public getImage(prod_name:string): Observable<Blob> {
    return this.http
      .get(ConsSettings.URL_IMAGES+prod_name,{
        responseType: "blob"
      });
  }
}
