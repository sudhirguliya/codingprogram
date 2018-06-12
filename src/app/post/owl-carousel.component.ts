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
  selector: 'image-slider',
  //template : 'test menu'
  template: `<div class="image">
                        <a href="#"><img src="{{this.src}}" alt="{{cpImage.page_name}}" /></a>
                        <div class="category"><a [routerLink]="this.subcategory ? ['/', this.category, this.subcategory] : ['/', this.category]">{{cpImage.details.category_detail.category_name}}</a></div>
                    </div>
                    <div class="lower-box">
                        <h3><a [routerLink]="this.subcategory ? ['/', this.category, this.subcategory, 'post', cpImage.page_name] : ['/', this.category, 'post', cpImage.page_name]">{{cpImage.page_title }}</a></h3>
                    </div>`,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['cpImage']
})

export class OwlCarousel {
  constructor(private http:Http, private pagerService: PagerService, private _global: AppGlobals, private router: Router, private route: ActivatedRoute, private location: Location, private service: RouterService,) {

    }
  src : string;
  private post_url : string;
  category : string;
  subcategory : string;

  @Input() cpImage: any;
  
  ngOnInit() {
      if(this.cpImage.image_path) {
        this.src = 'http://www.codingprogrammer.com/admin/upload/'+this.cpImage.image_path;
      }else{
        //console.log('component created', this.cpImage.page_description);
           var str = this.decodeHtml(this.cpImage.page_description);
          // //console.log(str);
          // //var regex = /<img.*?src='(.*?)'/;
           var regex = /<img[^>]*src="([^"]*)"/g;
           this.src = regex.exec(str)[1];
           //console.log(this.src);
      }

      this.http.get(this._global.baseAPIUrl +`coding/clickpost?category_id=${this.cpImage.category_id}`)
          .map((response: Response) => response.json())
          .subscribe(data => {
              //console.log(data.post_url);
              // set items to json response
              if(data.post_url.subcategory){
                this.category = data.post_url.category;
                this.subcategory = data.post_url.subcategory;
              }else{
                this.category = data.post_url.category;
                this.subcategory = '';
                //console.log(this.category);
              }
              
              //console.log(this.post_url);
              //this.location.replaceState('/'); 
              //this.router.navigate([this.post_url], {replaceUrl:true});
          });
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

  private decodeHtml(str)
    {
        var map =
        {
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#039;': "'"
        };
        return String(str).replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
    }
}