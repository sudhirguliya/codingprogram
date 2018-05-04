// Import our dependencies
import { Routes , Router, RouterModule } from '@angular/router';
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

// Define which component should be loaded based on the current URL
const appRoutes: Routes = [
  { path: '', component: HomeLayoutComponent },
  //{ path: 'login',  component: LoginComponent},
  //{ path: 'logout',  component: LogoutComponent},
  //{ path: 'signup', component: SignupComponent },
 // { path: 'register', component: SignupComponent },
  { path: 'home',   component: HomeLayoutComponent }, // , pathMatch: 'full'
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: ':category',
    component: HomeLayoutComponent,
    resolve: {
          category: CategoryResolve
        }
  },
  {
    path: ':category/:post',
    component: HomeLayoutComponent,
    resolve: {
          post: PostResolve
        }
  },
  /*{
    path: ':category/:subcategory',
    component: HomeLayoutComponent,
    resolve: {
          subcategory: PostResolve
        }
  },*/

  { path: '404', component: NotFoundComponent },
  { path: '**',  component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes, {
      useHash: false
    });