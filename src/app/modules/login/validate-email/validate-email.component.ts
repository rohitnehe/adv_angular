import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html'
})
export class ValidateEmailComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { 
  }

// add class to page body

  ngOnInit() {
    this.document.body.classList.add('login-page-body');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }

}
