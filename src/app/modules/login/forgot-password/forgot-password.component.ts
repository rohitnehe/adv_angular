import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordFrom: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder) { 
    this.createForm();
  }
 
  createForm() {
    this.forgotPasswordFrom = this.fb.group({
      email: ['', [Validators.required]],
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
