import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterService } from '../_services/router.service';
import { AppGlobals } from '../app.global.service';
//import { PostDetails } from '../shared/models/postdetails';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
    //postdetails: PostDetails;
    //postdesc : any;
    // array of all items to be paged
    //private allCategories: any[];
    //private allSubCategories: any[];
    //private baseUrl : String;

    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private service: RouterService, private _global: AppGlobals ) {
       
       /*this.route.params
          .map((data) => data['post'])
          .subscribe(
            (postdetails) => {
              //console.log(postdetails);

              this.service.postDetails(postdetails)
                .subscribe((postdetails) => {
                  this.postdesc = postdetails.post_detail;
                  //console.log(this.postdesc) 
                });
            }
          );*/

        /*this.route.params.pipe(
        switchMap(
          (params: Params) => 
           this.service.postDetails(params['post'])))
        .subscribe((postdetails) => {
          this.postdesc = postdetails.post_detail;
          //console.log(this.postdesc) 
        });*/
    }
 
    ngOnInit() {
      
    }
}
