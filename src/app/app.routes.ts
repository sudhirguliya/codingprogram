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
import { AboutUserResolve } from './_services/about-user-resolve.service';
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
    path: ':username',
    component: HomeLayoutComponent,
    resolve: {
          user: AboutUserResolve
        }
  },
  
  { path: '**',     component: NotFoundComponent },
];

export class AppRoute {
  
  /*constructor(private router:Router, private routerService:RouterService) {
    // This works
      // Pushing the same route as in routes.json
      // ----------------------
      appRoutes.push({ path: 'contact', component: HomeLayoutComponent })
      router.resetConfig(appRoutes);

      // This does works
      // By just console log this anonymous object, the loaded routing from the 
      // json data will work. 
      // ----------------------
      //console.log({ loadChildren: './contact/contact.module#ContactModule' })
      this.routerService.getCategories().subscribe((result) => { 
        result[0].category_link.forEach((route) => { console.log(route);
          appRoutes.push({ path: route, component: HomeLayoutComponent })
        });
        console.log(appRoutes);
        this.router.resetConfig(appRoutes);
      });
  }*/
}
export const routing = RouterModule.forRoot(appRoutes, {
      useHash: false
    });