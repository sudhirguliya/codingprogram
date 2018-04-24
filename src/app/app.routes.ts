// Import our dependencies
import { Routes , RouterModule } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';
//import { LogoutComponent } from './logout/logout.component';
//import { SignupComponent } from './signup/signup.component';
//import { ProfileComponent } from './profile/profile.component';
//import { AuthGuard } from './_guards/index';
import { NotFoundComponent } from './not-found/not-found.component'

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
    path: ':id',
    component: HomeLayoutComponent
  },
  /*{
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    redirectTo: 'admin/profile',
    pathMatch: 'full',
  },
  {
    path: 'category',
    redirectTo: 'admin/category',
    pathMatch: 'full',
  },
  {
    path: 'subcategory',
    redirectTo: 'admin/subcategory',
    pathMatch: 'full',
  },
  {
    path: 'plan',
    redirectTo: 'admin/plan',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: FullLayoutComponent,  canActivate: [AuthGuard],
    data: {
      title: 'Administrator'
    },
    children: [
      {
        path: 'dashboard',  canActivate: [AuthGuard], 
        loadChildren: './admin/dashboard/dashboard.module#DashboardModule'
      },
       {
         path: 'profile',  canActivate: [AuthGuard], 
         loadChildren: './admin/profile/profile.module#ProfileModule'
       },
	   {
         path: 'category',  canActivate: [AuthGuard], 
         loadChildren: './admin/category/category.module#CategoryModule'
       },
	   {
         path: 'subcategory',  canActivate: [AuthGuard], 
         loadChildren: './admin/subcategory/subcategory.module#SubCategoryModule'
       },
      {
        path: 'email_template',   canActivate: [AuthGuard],
        loadChildren: './admin/email_template/email.module#EmailTemplateModule'
      },
      {
        path: 'plan', canActivate: [AuthGuard],
        loadChildren: './admin/plan/plan.module#PlanModule'
      },
    ]
  },
  {
    path: 'consult',
    component: ConsultLayoutComponent,  canActivate: [AuthGuard],
    data: {
      title: 'Consultant'
    },
    children: [
      {
        path: 'dashboard',  canActivate: [AuthGuard], 
        loadChildren: './consult/dashboard/dashboard.module#DashboardModule'
      },
      {
         path: 'profile',  canActivate: [AuthGuard], 
         loadChildren: './consult/profile/profile.module#ProfileModule'
      },
	    {
         path: 'scheduling',  canActivate: [AuthGuard], 
         loadChildren: './consult/scheduling/scheduling.module#SchedulingModule'
      },
	    // {
      //    path: 'subcategory',  canActivate: [AuthGuard], 
      //    loadChildren: './consult/subcategory/subcategory.module#SubCategoryModule'
      // },
      // {
      //   path: 'email_template',   canActivate: [AuthGuard],
      //   loadChildren: './consult/email_template/email.module#EmailTemplateModule'
      // },
      // {
      //   path: 'plan', canActivate: [AuthGuard],
      //   loadChildren: './consult/plan/plan.module#PlanModule'
      // },
    ]
  },*/
  { path: '**',     component: NotFoundComponent },
]; 

export const routing = RouterModule.forRoot(appRoutes, {
      useHash: false
    });