import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//Routing
import { routing } from './app.routes';
import { Route, Routes , Router, RouterModule } from '@angular/router';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service';
import { CategoryResolve } from './_services/category-resolve.service';
import { SubCategoryResolve } from './_services/subcategory-resolve.service';
import { PostResolve } from './_services/post-resolve.service';
// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';

//Component
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    //RouterModule.forRoot(routes) //, { enableTracing: true })
    routing,
  ],
  exports: [
    RouterModule
  ],
  providers: [AppGlobals,RouterService, CategoryResolve, SubCategoryResolve, PostResolve],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}