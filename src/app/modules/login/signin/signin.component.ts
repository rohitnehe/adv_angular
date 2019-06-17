import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  signinFrom: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder) { 
    this.createForm();
  }
 
  createForm() {
    this.signinFrom = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
 
// add class to page body

  ngOnInit() {
    this.document.body.classList.add('login-page-body');
  }

  public Submit()
  {
	  return true;
  }
  
  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }

}
