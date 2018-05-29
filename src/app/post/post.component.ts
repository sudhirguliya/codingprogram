import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterService } from '../_services/router.service';
import { AppGlobals } from '../app.global.service';
import { PostDetails } from '../shared/models/postdetails';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    postdetails: PostDetails;
    postdesc : any;
    // array of all items to be paged
    private allCategories: any[];
    private allSubCategories: any[];
    private baseUrl : String;

    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private service: RouterService, private _global: AppGlobals ) {
       
       this.route.params
          .map((data) => data['post'])
          .subscribe(
            (postdetails) => {
              console.log(postdetails);

              this.service.postDetails(postdetails)
                .subscribe((postdetails) => {
                  this.postdesc = postdetails.post_detail;
                  console.log(this.postdesc) 
                });
            }
          );
    }
 
    ngOnInit() {
      this.showMenu();
      this.baseUrl = this._global.baseAppUrl; 
    }

  showMenu() {
    this.service.getCategories().subscribe(category => {
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
