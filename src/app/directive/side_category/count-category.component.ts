import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppGlobals } from '../../app.global.service';
import { RouterService } from '../../_services/router.service';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';

//import * as _ from 'underscore';
import { PagerService } from '../../_services/pager.service';

@Component({
  moduleId: module.id,
  selector: 'count-category',
  //template : 'test menu'
  template: `<ul class="cat-list">
              <li class="clearfix" *ngFor="let item of allCountCategories"><a href="#">{{item.category_name}} <span>({{item.total}})</span></a></li>
            </ul>`,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //inputs: ['cpImage']
})

export class CountCategoryComponent {
	constructor(private http:Http, private pagerService: PagerService, private _global: AppGlobals, private router: Router, private route: ActivatedRoute, private location: Location, private service: RouterService,) {}
	src : any;
  allCountCategories : any;
  private post_url : any;

	//@Input() cpImage: any;
	
	ngOnInit() {
	  this.service.getCountCategories().subscribe(countcategory => {
      console.log(countcategory);
      if (countcategory.status == true) {
        //console.log('hi');
        this.allCountCategories = countcategory.category_count;
        //console.log(this.allCountCategories);
      } else {
        
        return false;
      }
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
}