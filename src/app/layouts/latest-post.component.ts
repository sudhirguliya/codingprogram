import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppGlobals } from '../app.global.service';
import { RouterService } from '../_services/router.service';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';

import * as _ from 'underscore';
import { PagerService } from '../_services/pager.service';

@Component({
  selector: 'latest-post',
  //template : 'test menu'
  templateUrl: './latest-post.component.html',
  styles : [`.post_infinite{
  height: 400px;
  weight: auto;
  overflow : scroll;
}`]
})

export class LatestPostComponent implements OnInit {
  currentPage: number = 0;

   news: Array<any> = [];
  allNews: String[] = [];

  scrollCallback;

  // array of all items to be paged
    private allItems: any[];
    private catShow : any[];
    private sub : any;
    loading = false;
    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    isValid : boolean = false;
    private category_url: any;
    private post_url : any;
    private category_slug: any;
    categoryName : any;
    private contract : any[];

    homeworld: Observable<{}>;

    constructor(private http:Http,  private pagerService: PagerService, private _global: AppGlobals, private router: Router, private route: ActivatedRoute, private location: Location, private service: RouterService,) {
         this.scrollCallback = this.getStories.bind(this);

    }

    getStories() {
        return this.service.getLatestPost(this.currentPage).do(this.processData);
    }

    private processData = (news) => {
        //console.log(news);
        //this.currentPage++;
        this.news = this.news.concat(news);
        //this.allNews = this.news[0].user_status;
        //this.allNews.push(this.news[0].post_data);
        console.log(this.news);
        //console.log(news.json().user_status);
      }

    ngOnInit() {
        
    }

   /* ngOnDestroy() {
        this.sub.unsubscribe();
      }*/

    getPostWithCategory(page : number = 0) {
        var url;
        url = this._global.baseAPIUrl +`coding/all_post?page=${page}`;
        this.http.get(url)
            .map((res: Response) => res.json())
            .flatMap((posts) => {
                //console.log(posts.post_data);
                if (posts.post_data.length > 0) {
                    return Observable.forkJoin(
                      posts.post_data.map((cat: any) => {
                          //console.log(cat.category_id);
                        return this.http.get(this._global.baseAPIUrl +`coding/category?category_id=${cat.category_id}`)
                          .map((res: any) => {
                            let details: any = res.json();
                            cat.details = details;
                            return cat;
                          });
                      })
                    );
                    
                  }
            })
            .subscribe((res) => 
                {
                    this.loading = false
                    this.allItems = res;
                    //console.log(this.allItems[0].details.category_detail.category_name)
                    this.currentPage++;
                    this.allItems = this.allItems.concat(res);
                    //this.allNews = this.news[0].user_status;
                    //this.allNews.push(this.news[0].user_status);
                    console.log(this.allItems);
                },
                ()=>this.loading = false);
            //console.log(this.contract);
    }

    clickPost(category_id:number, post:string){
        //console.log(this._global.baseAPIUrl +`coding/clickpost?category_id=${category_id}`);
        this.http.get(this._global.baseAPIUrl +`coding/clickpost?category_id=${category_id}`)
            .map((response: Response) => response.json())
            .subscribe(data => {
                
                // set items to json response
                this.post_url = data.post_url+'/post/'+post;
                //console.log(this.post_url);
                this.location.replaceState('/'); 
                this.router.navigate([this.post_url], {replaceUrl:true});
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

    

    /*ngOnDestroy() {
    this.category_slug.unsubscribe();
  }*/
}