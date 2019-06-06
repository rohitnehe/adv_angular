import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { SetupUsernameComponent } from './setup-username/setup-username.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { LoginComponent } from './login.component';
@NgModule({
  declarations: [LoginComponent, SigninComponent, ForgotPasswordComponent, ValidateEmailComponent, SetupUsernameComponent, SetupPasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class LoginModule {
  constructor() {
  }
}
