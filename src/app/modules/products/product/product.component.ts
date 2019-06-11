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
  productsList = [];

  constructor(private apiService: ApiService, private productsService: ProductsService) { }

  ngOnInit() {
    this.productList();
  }

  productList() {
    const that = this;

    try {
      //console.log('loginModel '+this.signinFrom.value);return false;
      this.productsService.GetProducts().subscribe(data => {
      //  console.log(data);
        if (data !== null && data !== undefined) {
          for (let i = 0, len = data.data.length; i < len; i++) {
            this.productsList.push({ id: data.data[i].external_id, botanicalName: data.data[i].botanical_name,
              commonName: data.data[i].common_name, otherName: data.data[i].other_name,
              productGroup1: data.data[i].productgroup1, productGroup2: data.data[i].productgroup2,
              productGroup3: data.data[i].productgroup3, productGroup4: data.data[i].productgroup4,
              productGroup5: data.data[i].productgroup5 });
          }
        }
      //  this.response = data;

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
