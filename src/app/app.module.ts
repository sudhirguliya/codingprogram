import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import * as $ from 'jquery';
//import { MetaModule, MetaConfig, MetaService } from 'ng2-meta';

//Routing
import { routing } from './app.routes';
//import { Route, Routes , Router, RouterModule } from '@angular/router';
//directive
import { InfiniteScrollerDirective } from './directive/infinite-scroller.directive';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service';
import { CategoryResolve } from './_services/category-resolve.service';
import { SubCategoryResolve } from './_services/subcategory-resolve.service';
import { PostResolve } from './_services/post-resolve.service';
import { PagerService } from './_services/pager.service';
import { LinkService } from './_services/meta-link.service'
//import { GlobalEventsManager } from './_services/global-events-manager'
// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { CategoryPostLayoutComponent } from './layouts/category-post-layout.component';
import { PostDetailsLayoutComponent } from './layouts/post-details-layout.component';

//Component
import { CountCategoryModule } from './directive/side_category/count-category.module';
import { CpImageComponent } from './layouts/cp-image.component';
import { CpImageTabComponent } from './layouts/cp-image-tab.component';
import { LatestPostComponent } from './layouts/latest-post.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Pipe
import { TruncatePipe } from './pipes/truncate.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';

//import { PostModule } from './post/post.module';
/*const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Default title for pages without meta in their route',
    titleSuffix: ' | Site Name',
    'og:image': 'http://example.com/default-image.png',
    'any other': 'arbitrary tag can be used'
  }
};*/

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent, LatestPostComponent, CategoryPostLayoutComponent, PostDetailsLayoutComponent,
    TruncatePipe, EscapeHtmlPipe, RemoveHtmlPipe,
    InfiniteScrollerDirective, CpImageComponent, CpImageTabComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule, CountCategoryModule,
    //RouterModule.forRoot(routes) //, { enableTracing: true })
    routing,
    //MetaModule.forRoot()
  ],
  //exports: [LatestPostComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AppGlobals,RouterService, CategoryResolve, SubCategoryResolve, PostResolve, PagerService, LinkService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}