import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-username',
  templateUrl: './setup-username.component.html'
})
export class SetupUsernameComponent implements OnInit {

  setupUsernameFrom: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder) { 
    this.createForm();
  }
 
  createForm() {
    this.setupUsernameFrom = this.fb.group({
      username: ['', Validators.required],
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
