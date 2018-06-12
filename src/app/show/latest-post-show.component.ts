//import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ElementRef} from '@angular/core';
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
  moduleId: module.id,
  selector: 'latest-post-show',
  //template : 'test menu'
  templateUrl: './latest-post-show.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['options']
})

export class LatestPostShowComponent {
    @Input() options: any;
    constructor(private http:Http,  private pagerService: PagerService, private _global: AppGlobals, private router: Router, private route: ActivatedRoute, private location: Location, private service: RouterService,) {

    }

    // array of all items to be paged
    private allItems: any = [];
    private catShow : any[];
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
    private sub :any;

    /*ngOnChanges(...args: any[]) {
        console.log('onChange fired');
        console.log('changing', args);
    }*/
    ngOnInit() {
      this.loading = true;
    }

    ngOnChanges(changes: SimpleChanges) {
      //console.log(changes);
      if (changes['options']) {
          this.category_slug = this.options;
          //console.log('And '+ this.category_slug +' is '+ typeof(this.category_slug));
        
        //this.allMsgChangeLogs.push(changeLog);

        //this.category_url = this.route.params['category'];
        /*this.sub = this.route.params.subscribe(params => {
            console.log(params);
            if (params.subcategory) {
                this.category_slug = params.subcategory;
                this.category_url = this._global.baseAppUrl+params.category+'/'+params.subcategory;
            }else{
                this.category_slug = params.category;
                this.category_url = this._global.baseAppUrl+params.category;
            }
            
        });*/
        //console.log(this.category_slug);
        if(this.category_slug){
        this.service.getCategory(this.category_slug).subscribe(category => {
          //console.log(category);
          if (category.status == true) {
            //console.log('hi');
            var category_id = category.category_detail.category_id;
            this.categoryName = category.category_detail.category_name;
            //console.log(this.categoryName);
            this.getPostWithCategory(category_id);
            // get dummy data category_id=category_id&
            /*this.http.get(this._global.baseAPIUrl +`coding/postdata?category_id=${category_id}&limit=56`)
                .map((response: Response) => response.json())
                .subscribe(data => {
                    // set items to json response
                    this.allItems = data.post_data;
                    //console.log(this.allItems);
                    // initialize to page 1
                    if(this.allItems){
                        this.setPage(1);
                    }
                    
                });*/

          } else {
            this.getPostWithCategory();
            //console.log(this.contract);
            
            /*this.http.get(this._global.baseAPIUrl +'coding/postdata?limit=56')
                .map((response: Response) => response.json())
                .subscribe(data => {
                    // set items to json response
                    this.allItems = data.post_data;

                    // initialize to page 1
                    if(this.allItems){
                        this.setPage(1);
                    }
                });*/
          } 
        });
        
        }else {
              this.getPostWithCategory();
          }

       } // end if condition of change option

        //this.clickPost(2, 'microphone-issue-in-macbook');
        
    }

    /*ngOnDestroy() {
        this.sub.unsubscribe();
      }*/

    /*getBookAuthors(bookId: string) {
      return this.http.get(`/books/${bookId}`).map(res => res.json())
            .flatMap((book) => {
              return Observable.forkJoin(book.authors.map((author) => {
                return this.http.get(`/authors/${author.id}`).map(res => res.json());
              })
            });
    }*/

    getPostWithCategory(category_id : number = 0) {
        var url;
        //console.log(category_id);
        if(category_id == 0){
            url = this._global.baseAPIUrl +'coding/postdata?limit=56';
        }else{
            url = this._global.baseAPIUrl +`coding/postdata?category_id=${category_id}&limit=56`;
        }
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
                this.allItems = res;
                this.loading = false;
                //console.log(res);
                //console.log(this.allItems[0].details.category_detail.category_name)
                // initialize to page 1
                if(this.allItems){
                    this.setPage(1);
                }
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
                console.log(data);
                this.location.replaceState('/'); /*relativeTo: this.route,*/ 
                this.router.navigate([this.post_url], {replaceUrl:true});
                //this.router.navigate(['/', data.post_url, 'post', post], {relativeTo: this.route});
            });
    }

    myEvent(event) {
    console.log(event);
  }

    getDataFromTwoResources() {
        // The URLs in this example are dummy
        let url1 = this.http.get(this._global.baseAPIUrl +`coding/postdata?limit=56`).map(res => res.json());
        let url2 = this.http.get(this._global.baseAPIUrl +`coding/category`).map(res => res.json());
        return Observable.forkJoin([url1, url2]);
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

    ngOnDestroy() {
      this.allItems = null;
    }
}