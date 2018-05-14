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
}
