import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '../shared/models/category';
import { RouterService } from '../_services/router.service'

@Injectable()
export class AboutUserResolve implements Resolve<Category> {

  constructor(private service: RouterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    let username = route.params['username'];

    return this.service.getCategory(username).then(user => {
      if (user) {
        return user;
      } else {
        // navigate the user back to the about page
        this.router.navigate(['/about']);
        return false;
      }
    });
  }

}