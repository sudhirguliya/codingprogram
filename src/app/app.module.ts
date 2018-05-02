import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//Routing
import { routing } from './app.routes';
import { Routes , Router, RouterModule } from '@angular/router';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service'
// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';

//Component
import { NotFoundComponent } from './not-found/not-found.component';

/*let appRoutes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeLayoutComponent },
  //{ path: 'coding', component: HomeLayoutComponent },
  { path: '**',     component: NotFoundComponent }
];*/

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    //RouterModule.forRoot(appRoutes),
    routing,
  ],
  providers: [AppGlobals,RouterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
