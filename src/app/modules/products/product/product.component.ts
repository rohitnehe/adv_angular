import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { LoginViewModel } from '../../../shared/module/LoginViewModel';
//import { GlobalSharedService } from '../../services/global-shared.service';
import { ApiService, HttpReqMethod } from '../../../services/api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  response: any;
  token: any;

  constructor(private apiService: ApiService, private productsService: ProductsService) { }

  ngOnInit() {
    this.productList();
  }

  productList() {
    const that = this;

    try {
      //console.log('loginModel '+this.signinFrom.value);return false;
      this.productsService.GetProducts().subscribe(data => {
        this.response = data;

      }, (error) => this.LoginErrorCallback(error, that));
    } catch (error) {
      console.log('Exception in: product.component.ts - In method: ngInit(). ' + error);
      //this.apiService.LogError('Exception in: login.component.ts - In method: Login. ' + error);
    }
  }

    // Error Callback if user encounters any error while login
    LoginErrorCallback(error: any, that: any) {
      console.log('loginModel12 '+error);return false;
      if (error.error.type === 'error') {
        that.validationError = 'Something went wrong, please try again.';
      } else {
        that.validationError = error.error.errorMessage;
        that.errorCode = (error.error.errorCode === undefined) ? null : error.error.errorCode;
        that.accountLockedDuration = (error.error.accountLockedDuration === undefined) ? 1 : error.error.accountLockedDuration;
      }
    }

}
