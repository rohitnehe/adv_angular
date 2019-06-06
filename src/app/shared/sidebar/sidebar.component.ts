import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

  public ngOnInit()
  {
    // jquery for side navigation

    $(document).ready(function(){
      $(".side-nav .side-nav-menu li a").on("click", function(e) {
        $(this).parent().hasClass("open") ? $(this).parent().children(".dropdown-menu").slideUp(200, function() {
          $(this).parent().removeClass("open")
        }) : ($(this).parent().parent().children("li.open").children(".dropdown-menu").slideUp(200), $(this).parent().parent().children("li.open").children("a").removeClass("open"), $(this).parent().parent().children("li.open").removeClass("open"), $(this).parent().children(".dropdown-menu").slideDown(200, function() {
          $(this).parent().addClass("open")
        }))
      }),
       $(".sidenav-fold-toggler").on("click", function(e) {
        $(".layout").toggleClass("side-nav-folded"), e.preventDefault()
      }), 
      $(".sub-down li a").on("click", function(e) {
        $(".layout").removeClass("side-nav-folded"), e.preventDefault()
      }),
      $(".nav-item .dropdown-toggle, .overlay").on("click", function(e) {
        $(".layout").removeClass("side-nav-folded"), e.preventDefault()
      })
    });
  }
}






