import { Injectable } from '@angular/core';
import { ApiService, HttpReqMethod } from './api.service';
import { environment } from '../../environments/environment';
import { LoginViewModel } from '../shared/module/LoginViewModel';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token: any = localStorage.getItem('token');

  constructor(private apiService: ApiService) { }

  url = environment.productServiceUrl + "products";

  public GetProducts() {
    return this.SendRequestToApi(this.token);
  }

  public SendRequestToApi(model: LoginViewModel) {
    const loginModel = Object.assign({}, model);
    loginModel.email = localStorage.getItem('token');
    return this.apiService.Request( this.url, HttpReqMethod.GET.toString(), loginModel);
  }

}
