import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Category } from '../shared/models/category';
import { RouterService } from '../_services/router.service'

@Injectable()

export class CategoryResolve{

  constructor(private service: RouterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    let username = route.params['username'];

    return this.service.getCategory(username).subscribe(category => {
      console.log(category);
      if (category.status == true) {
        console.log('hi');
        return category.category_detail.category_link;
      } else {
        console.log('bye');
        // navigate the user back to the about page
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
}