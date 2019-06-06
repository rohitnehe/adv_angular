import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // add class to page body

  ngOnInit() {
    this.document.body.classList.add('page-not-found');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('page-not-found');
  }
}
