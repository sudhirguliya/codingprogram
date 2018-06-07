import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShowRoutingModule } from './show-routing.module';
import { LatestPostShowComponent } from './latest-post-show.component';
import { RouterModule } from '@angular/router';
//import { LatestPostComponent } from '../layouts/latest-post.component';
import { CpImageShowComponent } from './cp-image-show.component';
import { ShowComponent } from './show.component';
import { CountCategoryShowComponent } from './count-category-show.component';
import { PostHtmlPipe } from './show-html.pipe';
import { RemoveHtmlPipe } from './remove-html.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShowRoutingModule,
    RouterModule
  ],
  declarations: [ CountCategoryShowComponent, ShowComponent, LatestPostShowComponent, CpImageShowComponent, PostHtmlPipe, RemoveHtmlPipe, TruncatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowModule { }
