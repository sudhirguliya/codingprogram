import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Category } from '../shared/models/category';
import { RouterService } from '../_services/router.service'

@Injectable()

export class CategoryResolve{

  constructor(private service: RouterService, private router: Router, private location: Location) {}

  resolve(route: ActivatedRouteSnapshot) {
    let category = route.params['category'];

    return this.service.getCategory(category).subscribe(category => {
      //console.log(category);
      if (category.status == true) {
        //console.log('hi category');
        //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        return category.category_detail.category_link;
      } else {
        //console.log('bye');
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        // navigate the user back to the about page
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
}