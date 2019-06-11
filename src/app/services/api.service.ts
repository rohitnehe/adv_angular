import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export enum HttpReqMethod {
  POST,
  GET,
  DELETE,
  PUT
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public Request(url: string, method: string, body?: object) {
    try {
      if (method === HttpReqMethod.GET.toString()) {
        return this.httpClient.get<any>(url);
      } else if (method === HttpReqMethod.POST.toString()) {
        return this.httpClient.post<any>(url, body);
      } else if (method === HttpReqMethod.DELETE.toString()) {
        return this.httpClient.delete<any>(url);
      } else if (method === HttpReqMethod.PUT.toString()) {
        return this.httpClient.put<any>(url, body);
      }
    } catch (error) {
      console.log('Error In api.service.ts at Method: Request. '+ error);
      //this.LogError('Error In api.service.ts at Method: Request. ' + error);
    }
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json',
       // Authorization: 'Bearer ' + 'asas'
    });
  }
  public async LogError(exception: string) {
    this.CallError(exception).subscribe(x => { });
  }

  public CallError(exception: string): Observable<any> {
    return this.httpClient.get<any>(/*environment.adminServiceUrl +*/ 'api/error/logerror?exception=' + exception);

  }
}

