import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//Routing
//import { routing } from './app.routes';
import { Route, Routes , Router, RouterModule } from '@angular/router';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service'
// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';

//Component
import { NotFoundComponent } from './not-found/not-found.component';

var appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeLayoutComponent },
  //{ path: 'coding', component: HomeLayoutComponent },
  { path: '**',     component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    RouterModule.forRoot(appRoutes)
    //routing,
  ],
  providers: [AppGlobals,RouterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router:Router, private routerService:RouterService) {
    // This works
      // Pushing the same route as in routes.json
      // ----------------------
      /*let routes = this.router.config;
      routes.push({ path: 'contact', component: HomeLayoutComponent })
      this.router.resetConfig(routes);*/

      /*let r: Route = {
          path: 'pop',
          component: HomeLayoutComponent
      };
      this.router.resetConfig([r, ...this.router.config]);*/

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
  }
}
