import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConsSettings } from './cons-settings';

@Injectable()
export class AuthenticationService {
  private headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  constructor(protected http: HttpClient) {}

  login(username: string, password: string) {
      return this.http.post<any>(ConsSettings.URL_AUTH, { user: username, password: password }, {headers: this.headers})
          .map(response => {
            if (!response.Error) localStorage.setItem(ConsSettings.CURRENT_USER, JSON.stringify({ token: btoa(response.Token), user: btoa(username), password: btoa(password) }));
            return response.Code;
          });
  }
}
