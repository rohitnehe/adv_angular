
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
//import { GlobalSharedService } from '../../services/global-shared.service';
import { ApiService, HttpReqMethod } from '../../services/api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinFrom: FormGroup;
  validationError: string = null;
  errorCode: string = null;
  disableLogin: boolean;
  response: any;

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder, 
  private authService: AuthenticationService, private router: Router, private apiService: ApiService) { 
    this.createForm();
  }
  
  createForm() {
    this.signinFrom = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  // add class to page body

  ngOnInit() {
    this.disableLogin = false;
    this.document.body.classList.add('login-page-body');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }

  public Submit() {
    try {
      this.MarkControlsAsTouched(this.signinFrom);
      
      if (this.signinFrom.valid) {
        this.Login();
       // return false;
      }
    } catch (error) {
      //this.apiService.LogError('Exception in: login.component.ts - In method: Submit. ' + error);
    }
  }

  // mark controls as touched
  MarkControlsAsTouched(formRef: FormGroup) {
    for (const property in formRef.controls) {
      if (property) {
        formRef.controls[property].markAsTouched();
      }
    }
  }

  // This function Validates user credentials against the database.
  public Login() {

    try {
      const that = this;
      this.validationError = null;
      this.errorCode = null;
      this.DisableLoginButton(true);  // Diable Login button
      //console.log('loginModel '+this.signinFrom.value);return false;
      this.authService.Authenticate(this.signinFrom.value).subscribe(data => {
        this.response = data;
        //console.log(this.response.data[0].access_token);
        this.DisableLoginButton(false);
        this.LoginUser();
      }, (error) => this.LoginErrorCallback(error, that));
    } catch (error) {
      console.log('Exception in: login.component.ts - In method: Login. ' + error);
      //this.apiService.LogError('Exception in: login.component.ts - In method: Login. ' + error);
    }
  }

  // Error Callback if user encounters any error while login
  LoginErrorCallback(error: any, that: any) {
    console.log('loginModel12 '+error);return false;
    this.DisableLoginButton(false);
    if (error.error.type === 'error') {
      that.validationError = 'Something went wrong, please try again.';
    } else {
      that.validationError = error.error.errorMessage;
      that.errorCode = (error.error.errorCode === undefined) ? null : error.error.errorCode;
      that.accountLockedDuration = (error.error.accountLockedDuration === undefined) ? 1 : error.error.accountLockedDuration;
    }
  }

  // Disable login Button
  DisableLoginButton(disable: boolean) {
    this.disableLogin = disable;
  }

  LoginUser() {
    try {
      // save token in local storage.
      this.authService.Store(this.response.data[0].access_token);
      if (this.response.data[0].access_token == null) {
        this.router.navigate(['/error']);
      //  this.globalService.SetRoleChanged(true);
      } else {
        this.router.navigate(['/profile']);
      //  this.globalService.SetRoleChanged(true);
      }
    } catch (error) {
      this.apiService.LogError('Exception in: login.component.ts - In method: LoginUser. ' + error);
    }
  }
  
}


