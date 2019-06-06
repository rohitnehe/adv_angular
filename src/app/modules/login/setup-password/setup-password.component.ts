import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../password.match.validator';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html'
})
export class SetupPasswordComponent implements OnInit {

  setupPasswordFrom: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder) { 
    this.createForm();
  }
 
   
  createForm() {
    this.setupPasswordFrom = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,128}'),]],
      confirmPassword: ['', Validators.required],
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
  })
  }
 
// add class to page body

  ngOnInit() {
    this.document.body.classList.add('login-page-body');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }

}
