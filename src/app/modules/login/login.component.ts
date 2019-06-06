
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

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
  private authService: AuthenticationService) { 
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
        
        this.DisableLoginButton(false);
        //this.LoginUser();
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
  
}


