// Import our dependencies
import { Routes , Router, RouterModule, PreloadAllModules } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';
//import { LogoutComponent } from './logout/logout.component';
//import { SignupComponent } from './signup/signup.component';
//import { ProfileComponent } from './profile/profile.component';
//import { AuthGuard } from './_guards/index';
import { NotFoundComponent } from './not-found/not-found.component'

import { RouterService } from './_services/router.service';
import { CategoryResolve } from './_services/category-resolve.service';
import { SubCategoryResolve } from './_services/subcategory-resolve.service';
import { PostResolve } from './_services/post-resolve.service';

// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { CategoryPostLayoutComponent } from './layouts/category-post-layout.component';
import { PostDetailsLayoutComponent } from './layouts/post-details-layout.component';


// Define which component should be loaded based on the current URL
const appRoutes: Routes = [
  { path: '', component: HomeLayoutComponent },
 
  { path: 'home',   component: HomeLayoutComponent }, // , pathMatch: 'full'
  {
    path: ':category',
    component: HomeLayoutComponent,
    /*resolve: {
          category: CategoryResolve
    },*/
    children: [
      {
        path: 'post/:post',
        loadChildren: './post/post.module#PostModule'
      }
    ]
  },
  /*{
    path: ":category/post/:post", component: PostDetailsLayoutComponent,
      resolve: {
        post: PostResolve
      }
  },
  {
    path: ':category/:subcategory',
    component: CategoryPostLayoutComponent,
    resolve: {
          subcategory: SubCategoryResolve
        }
  },
  {
    path: ':category/:subcategory/post/:post',
    component: PostDetailsLayoutComponent,
    resolve: {
          post: PostResolve
        }
  }, */

  { path: '404', component: NotFoundComponent },
  { path: '**',  component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes, {
      useHash: false, preloadingStrategy: PreloadAllModules
    });