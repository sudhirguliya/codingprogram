import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//Routing
import { routing } from './app.routes';
//Service
import { GlobalService } from './app.global.service';

// Layouts
import { HomeLayoutComponent } from './layouts/home-layout.component';

//Component
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent, HomeLayoutComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, routing,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
