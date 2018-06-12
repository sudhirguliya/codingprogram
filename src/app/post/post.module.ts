import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';

// Import your library
import { OwlModule } from 'ng2-owl-carousel';

import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { CountCategoryModule } from '../directive/side_category/count-category.module';
import { PostComponent } from './post.component';
import { PostHtmlPipe } from './post-html.pipe';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    RouterModule,
    OwlModule,
    CountCategoryModule
  ],
  declarations: [ PostComponent, PostHtmlPipe, BreadcrumbsComponent],
})
export class PostModule { }
