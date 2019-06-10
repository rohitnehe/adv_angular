import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel } from '../shared/module/LoginViewModel';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ApiService, HttpReqMethod } from '../services/api.service';


import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  public Authenticate(model: LoginViewModel) {
    const loginModel = Object.assign({}, model);
    loginModel.email = model.email;
    loginModel.password = model.password;
    return this.apiService.Request(environment.userServiceUrl + 'users/login', HttpReqMethod.POST.toString(), loginModel);
  }

  RefreshToken() {
    console.log('dsfsffs');
    // Token endpoint & params.
    const tokenEndpoint: string = environment.userServiceUrl + 'api/authentication/refresh';

    if (this.IsAuthenticated() === true) {
      this.apiService.Request(tokenEndpoint, HttpReqMethod.GET.toString()).subscribe(data => {
        if (data !== 'undefined' && data !== null) {
          if (data.tokenString !== 'undefined' && data.tokenString !== null) {
            this.Store(data.tokenString);
          }
        }
      }, (error) => {
        if (error.status === 401) {
          localStorage.clear();
          location.replace('/#/login');
        }
        if (error.status === 500) {
          localStorage.clear();
          location.replace('/#/login');
        }
        // Error on post request.
        return throwError(error);
      });
    }

  }


  // Store Token in local storage
  public Store(token: any) {
    localStorage.setItem('token', token);
  }

  // Get Login status
  IsAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === undefined || token == null) {
      return false;
    } else {
      return true;
    }
  }

  // Remove Authentication Token from local storage
  ClearToken() {
    localStorage.removeItem('token');
  }

  // Call signout service
  public signout(): Observable<any> {
    return this.httpClient.get(environment.userServiceUrl + 'api/authentication/logout');
  }
}
