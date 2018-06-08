import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostResolve } from '../_services/post-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    data: {
      title: 'Post Details',
      breadcrumbs: 'Repo List'
    },
    resolve: {
        post: PostResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
