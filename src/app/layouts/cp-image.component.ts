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
  selector: 'image-show',
  //template : 'test menu'
  template: `<div class="image">
                <a (click)="clickPost( cpImage.category_id, cpImage.page_name)"><img class="wow fadeIn" data-wow-delay="0ms" data-wow-duration="2500ms" src="{{this.src}}" alt="{{cpImage.page_name}}" /></a>
                <div class="category"><a (click)="clickPost( cpImage.category_id, cpImage.page_name)">{{cpImage.details.category_detail.category_name}}</a></div>
            </div>`,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['cpImage']
})

export class CpImageComponent {
	constructor(private http:Http, private pagerService: PagerService, private _global: AppGlobals, private router: Router, private route: ActivatedRoute, private location: Location, private service: RouterService,) {

    }
	src : any;
  private post_url : any;

	@Input() cpImage: any;
	
	ngOnInit() {
	    //console.log('component created', this.cpImage.page_description);
         var str = this.decodeHtml(this.cpImage.page_description);
        // //console.log(str);
        // //var regex = /<img.*?src='(.*?)'/;
         var regex = /<img[^>]*src="([^"]*)"/g;
         this.src = regex.exec(str)[1];
         //console.log(this.src);
        // this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        // this.viewContainer.createEmbeddedView(src);   
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