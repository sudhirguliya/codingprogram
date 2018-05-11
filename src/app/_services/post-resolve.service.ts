import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Category } from '../shared/models/category';
import { RouterService } from '../_services/router.service'

@Injectable()

export class PostResolve{

  constructor(private service: RouterService, private router: Router, private location: Location) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let post = route.params['post'];
    let category_link = route.params['category'];
    let subcategory = route.params['subcategory'];
    //console.log(subcategory);
    return this.service.getCategory(post).subscribe(category => {
      //console.log(category);
      if (category.status == true) {
        //console.log('hi');
        return category.category_detail.category_link;
      } else {
        //console.log('bye');
        // navigate the user back to the about page
        //this.router.navigate(['/'+category]);
        //return false;
        return this.service.getPost(category_link, post ).subscribe(post => {
          //console.log(post);
          //console.log(category_link);
          if (post.status == true) {
            //console.log('hi post');
            return post.post_detail.page_name;
          } else {
            //console.log('bye post');
            // navigate the user back to the about page
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            if(subcategory){
              this.router.navigate(['/'+category_link+'/'+subcategory], { replaceUrl: true });
            }else{
              this.router.navigate(['/'+category_link], { replaceUrl: true });
              //this.router.navigateByUrl('/'+category_link);
            }
            
            return false;
          }
        });
      }
    });
    
  }
}