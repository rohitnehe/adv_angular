import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { SampleListComponent } from './sample-list/sample-list.component';

//CustomPreloadingStrategy service used for preloading module

import { CustomPreloadingStrategy } from './services/custom-preloading-strategy.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// routing and lazyloading with prealoding declaration for all modules this is main routing module of app

const routes: Routes = [
  {
    path: 'products',
    loadChildren: './modules/products/products.module#ProductsModule',
  },
  {
    path: 'sample-form',
    component: SampleFormComponent
  },
   {
     path: 'orders-and-quotes',
     component: SampleListComponent
  },

  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      {
        useHash:true,
        preloadingStrategy: CustomPreloadingStrategy
      }
      )
  ],
  exports: [RouterModule],
  providers:[CustomPreloadingStrategy]

})
export class AppRoutingModule { }


