import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Category } from '../shared/models/category';
import { RouterService } from '../_services/router.service'

@Injectable()

export class SubCategoryResolve{

  constructor(private service: RouterService, private router: Router, private location : Location) {}

  resolve(route: ActivatedRouteSnapshot) {
    let subcategory = route.params['subcategory'];

    return this.service.getCategory(subcategory).subscribe(category => {
      //console.log(category);
      if (category.status == true) {
        //console.log('hi');
        //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        return category.category_detail.category_link;
      } else {
        //console.log('bye');
        // navigate the user back to the about page
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
}