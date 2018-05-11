import { Component, OnInit } from '@angular/core';
import { RouterService } from '../_services/router.service'
import { AppGlobals } from '../app.global.service';
 
@Component({
  selector: 'app-dashboard',
  //template: '<router-outlet></router-outlet>',
  templateUrl: './category-post-layout.component.html'
})
export class CategoryPostLayoutComponent implements OnInit {

  constructor(private _global: AppGlobals, private routerservice : RouterService) { }

  // array of all items to be paged
  private allCategories: any[];
  private allSubCategories: any[];
  private baseUrl : String;

  ngOnInit(): void {
    this.showMenu();
    this.baseUrl = this._global.baseAppUrl; 
  }

  showMenu() {
    this.routerservice.getCategories().subscribe(category => {
      //console.log(category);
      if (category.status == true) {
        //console.log('hi');
        this.allCategories = category[0];
        //this.allSubCategories = category.allCategories.subcategory;
        //console.log(this.allCategories);
      } else {
        //console.log('bye menu');
        //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        // navigate the user back to the about page
        //this.router.navigate(['/home']);
        return false;
      }
    });
  }
  /*ngOnInit() {
  	let routes = this.router.config;
    this.routerService.getCategories().subscribe((result) => { 
        result[0].category_link.forEach((route) => { //console.log(route);
          routes.push({ path: route, component: HomeLayoutComponent })
        });
        console.log(routes);
        //this.router.resetConfig(router);
      });
    this.router.resetConfig(routes);
}*/

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
