import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  //template: '<router-outlet></router-outlet>',
  templateUrl: './home-layout.component.html'
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  /*this.coreService.getCoreEndpoints()
      .subscribe(
        (endpoints) => {
          _.forEach(Object.keys(endpoints), (e: string) => {
            this.router.config.push({
              path: `core/${e}`,
              data: {
                name: e
              },
              component: MyComponent
            });
          });
          this.router.resetConfig(this.router.config);
        }
      );*/
}
