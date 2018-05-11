import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

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

//Component
import { LatestPostComponent } from './layouts/latest-post.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Pipe
import { TruncatePipe } from './pipes/truncate.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent, LatestPostComponent, CategoryPostLayoutComponent,
    TruncatePipe, EscapeHtmlPipe
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    //RouterModule.forRoot(routes) //, { enableTracing: true })
    routing,
  ],
  providers: [AppGlobals,RouterService, CategoryResolve, SubCategoryResolve, PostResolve, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}