import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import * as $ from 'jquery';

//Routing
import { routing } from './app.routes';
//import { Route, Routes , Router, RouterModule } from '@angular/router';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service';
import { CategoryResolve } from './_services/category-resolve.service';
import { SubCategoryResolve } from './_services/subcategory-resolve.service';
import { PostResolve } from './_services/post-resolve.service';
import { PagerService } from './_services/pager.service';
//import { GlobalEventsManager } from './_services/global-events-manager'
// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { CategoryPostLayoutComponent } from './layouts/category-post-layout.component';
import { PostDetailsLayoutComponent } from './layouts/post-details-layout.component';

//Component
import { LatestPostComponent } from './layouts/latest-post.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Pipe
import { TruncatePipe } from './pipes/truncate.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';

//import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent, LatestPostComponent, CategoryPostLayoutComponent, PostDetailsLayoutComponent,
    TruncatePipe, EscapeHtmlPipe, RemoveHtmlPipe
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule,
    //RouterModule.forRoot(routes) //, { enableTracing: true })
    routing
  ],
  //exports: [LatestPostComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AppGlobals,RouterService, CategoryResolve, SubCategoryResolve, PostResolve, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}