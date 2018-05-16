import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterService } from '../_services/router.service';
import { AppGlobals } from '../app.global.service';
import { PostDetails } from '../shared/models/postdetails';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/switchMap';
import { switchMap } from 'rxjs/operators';
 
@Component({
  selector: 'app-dashboard',
  //template: '<router-outlet></router-outlet>',
  templateUrl: './post-details-layout.component.html'
})
export class PostDetailsLayoutComponent implements OnInit {
	postdetails: PostDetails;
	postdesc : any;
	// array of all items to be paged
  	private allCategories: any[];
  	private allSubCategories: any[];
  	private baseUrl : String;

  	constructor(private route: ActivatedRoute, private service: RouterService, private _global: AppGlobals) { }

  	ngOnInit(): void {
  		this.showMenu();
    	this.baseUrl = this._global.baseAppUrl; 

	  this.route.params.pipe(
	    switchMap(
	      (params: Params) => 
	       this.service.postDetails(params['post'])))
	    .subscribe((postdetails) => {
	    	
	    	this.postdesc = postdetails.post_detail;
	    	//console.log(this.postdesc) 
	    });
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
