import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../app.global.service';
import { RouterService } from '../_services/router.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';
import { PagerService } from '../_services/pager.service';

@Component({
  selector: 'latest-post',
  //template : 'test menu'
  templateUrl: './latest-post.component.html'
})

export class LatestPostComponent {

    constructor(private http:Http,  private pagerService: PagerService, private _global: AppGlobals, private route: ActivatedRoute, private service: RouterService,) {

    }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    isValid : boolean = false;
    private category_url: any;

    ngOnInit() {
        //this.category_url = this.route.params['category'];
        this.route.params.subscribe(params => {
            console.log(params);
            this.category_url = params.category;
        });
        
        this.service.getCategory(this.category_url).subscribe(category => {
          //console.log(category);
          if (category.status == true) {
            //console.log('hi');
            var category_id = category.category_detail.category_id;
          } else {
            //console.log('bye');
            /*this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            // navigate the user back to the about page
            this.router.navigate(['/home']);
            return false;*/
          }
        });
        // get dummy data category_id=category_id&
        this.http.get(this._global.baseAPIUrl +'coding/postdata?limit=56')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data.post_data;

                // initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    
}