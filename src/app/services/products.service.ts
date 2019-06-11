import { Injectable } from '@angular/core';
import { ApiService, HttpReqMethod } from './api.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  url = environment.productServiceUrl + "products";

  GetProducts() {
    return this.apiService.Request( this.url, HttpReqMethod.GET.toString());
  }

}
