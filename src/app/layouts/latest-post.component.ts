import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppGlobals } from '../app.global.service';
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

    constructor(private http:Http,  private pagerService: PagerService, private _global: AppGlobals) {

    }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        // get dummy data
        this.http.get(this._global.baseAPIUrl +'coding/postdata')
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