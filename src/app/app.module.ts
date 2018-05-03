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

var routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeLayoutComponent },
  { path: ':id', component: HomeLayoutComponent },
  { path: '**',     component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    RouterModule.forRoot(routes) //, { enableTracing: true })
    //routing,
  ],
  exports: [
    RouterModule
  ],
  providers: [AppGlobals,RouterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, routerModule: RouterModule, private routerService:RouterService) {
    /*router.resetConfig([
			 { path: 'team/:id', component: HomeLayoutComponent, children: [
			   { path: 'simple', component: HomeLayoutComponent },
			   { path: 'user/:name', component: HomeLayoutComponent }
			 ] }
			]);*/
    var config = router.config;
    //console.log('Routes: ', JSON.stringify(routes, undefined, 1));
    config.push({path: 'new', component: HomeLayoutComponent});
    this.routerService.getCategories().subscribe((result) => { 
        result[0].category_link.forEach((route) => { //console.log(route);
          config.push({ path: route, component: HomeLayoutComponent })
        });
        //console.log(routes);
        
        config.forEach((x, i) => {
	      //console.log(`${i}: ${	JSON.stringify(x, undefined, 1)}`);

	    });
	    router.resetConfig(config);
	    console.log(router.config)
	    	
    });

    
  }
}