import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';

import { RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
//import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
//import { RemoveHtmlPipe } from '../pipes/remove-html.pipe';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    RouterModule
  ],
  declarations: [ PostComponent ]
})
export class PostModule { }
