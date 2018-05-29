import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './show.component';
//import { PostResolve } from '../_services/post-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ShowComponent,
    data: {
      title: 'Category Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule {}
