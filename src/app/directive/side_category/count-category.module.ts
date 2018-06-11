import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { CountCategoryComponent } from './count-category.component';
import * as $ from 'jquery';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, RouterModule],
  declarations: [CountCategoryComponent],
  exports: [CountCategoryComponent]
})
export class CountCategoryModule {}