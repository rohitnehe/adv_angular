import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    pendingRequests = 0;
    constructor(public router: Router, public AuthService: AuthenticationService, public SpinnerService: Ng4LoadingSpinnerService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const that = this;
        if (req.url.indexOf('authentication/refresh') <= 0) {
            setTimeout( () => { that.RefreshToken(); }, 100);
        }
        this.pendingRequests++;
        if (this.pendingRequests >= 1) {
            if (this.showLoader(req.url)) {
                this.SpinnerService.show();
            }
        }


        const dummyrequest = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        return next.handle(dummyrequest)
            .catch((err: any) => {
                this.pendingRequests--;
                if (this.pendingRequests === 0) {
                    this.SpinnerService.hide();
                }

                if (err.status === 401) {
                    this.HandleAuthError();
                }
                return throwError (err);
            })
            .do(event => {
                if (event instanceof HttpResponse) {
                    this.pendingRequests--;
                    if (this.pendingRequests === 0) {
                        this.SpinnerService.hide();
                    }

                }
            });
    }

    private showLoader(url: string) {
        let res = true;
        if (url.indexOf('authentication/refresh') > -1 || url.indexOf('user/IsEmailIdAlreadyExits') > -1
          || url.indexOf('forgotpassword/GetUserDetailsFromUsername') > -1 || url.indexOf('SalesCode/CheckSalesCodeExitsOrNot') > -1
          || url.indexOf('carriers/saveCarrierDocumnetTypes') > -1 || url.indexOf('carriers/saveAllCarrierDocumnetTypes') > -1
          || url.indexOf('agencies/CheckAgencyNameExists') > -1 || url.indexOf('agencies/CheckTaxIdExists') > -1
          || url.indexOf('carriersForms/CheckFormCodeExitsAganistCarrier') > -1
          || url.indexOf('carriersForms/CheckFormNameExitsAganistCarrier') > -1
        ) {
          res = false;
        }
        return  res;
    }
    // Handle Authorization Error
    HandleAuthError() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    RefreshToken() {
        const token = localStorage.getItem('token');
        if (token != null && token !== undefined) {
            this.AuthService.RefreshToken();
        }
    }
}
