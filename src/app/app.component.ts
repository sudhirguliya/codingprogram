import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  template: '<router-outlet></router-outlet>',
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Goconsult!';
  
}
