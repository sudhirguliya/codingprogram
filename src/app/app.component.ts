import { Component } from '@angular/core';
import { Route, Routes , Router, RouterModule, ActivatedRoute } from '@angular/router';
//Service
import { AppGlobals } from './app.global.service';
import { RouterService } from './_services/router.service';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'Goconsult!';
  constructor(private router: Router,
           private routerService: RouterService,
           private route: ActivatedRoute,
           private location: Location)
{}
}
