import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';

// Import your library
import { ShowArticleComponent } from "./show-article.component";
import { OwlModule } from 'ng2-owl-carousel';
import { OwlCarousel } from './owl-carousel.component'
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
  declarations: [ 
    PostComponent, 
    PostHtmlPipe, 
    BreadcrumbsComponent, 
    OwlCarousel,
    ShowArticleComponent
  ],
})
export class PostModule { }
