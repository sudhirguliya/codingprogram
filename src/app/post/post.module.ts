import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';

import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { CountCategoryShowComponent } from './count-category-show.component'
import { PostComponent } from './post.component';
import { PostHtmlPipe } from './post-html.pipe';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    RouterModule
  ],
  declarations: [ PostComponent, PostHtmlPipe, CountCategoryShowComponent, BreadcrumbsComponent],
})
export class PostModule { }
