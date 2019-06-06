import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { SetupUsernameComponent } from './setup-username/setup-username.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { LoginComponent } from './login.component';
import { from } from 'rxjs';
 
const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'validate-email',
    component: ValidateEmailComponent
  },
  {
    path: 'setup-username',
    component: SetupUsernameComponent
  },
  {
    path: 'setup-password',
    component: SetupPasswordComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
