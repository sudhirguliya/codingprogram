import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';
import { RouterService } from '../_services/router.service';
import { AppGlobals } from '../app.global.service';
import { PostDetails } from '../shared/models/postdetails';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    postdetails: PostDetails;
    postdesc : any;
    // array of all items to be paged
    allCategories: any[];
    allSubCategories: any[];
    baseUrl : String;

    private blogpostId: number;
    private categoryId: number;
    metatitle: string;
    description: string;
    keyboards: string;

    allItems : any;
    sliderOptions : any;
    constructor(private title: Title, private meta: Meta, private route: ActivatedRoute, private router: Router, private http: Http, private service: RouterService, private _global: AppGlobals ) {

       
       this.meta.addTag({ name: 'author', content: 'Sudhir Chaudhary' });
        const author = this.meta.getTag('name=author');
        this.meta.removeTagElement(author);

        const description = this.meta.getTag('name=description');
        this.meta.removeTagElement(description);

        const keywords = this.meta.getTag('name=keywords');
        this.meta.removeTagElement(keywords); 

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
    }
 
    ngOnInit() {
      this.showMenu();



      //this.getPostWithCategory();
      this.sliderOptions = { margin: 5, dots: false, navigation: true, nav: true, navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ], autoplay: true, loop: true, autoplayTimeout: 2000, autoplayHoverPause: true, lazyLoad: true, responsive:{ 0:{ items: 1 }, 600:{ items: 2 }, 960:{ items: 3 }, 1200:{ items: 3 } } };
      this.baseUrl = this._global.baseAppUrl; 

      this.route.params.pipe(
        switchMap(
          (params: Params) => 
           this.service.postDetails(params['post'])))
        .subscribe(postdetails => {
          //console.log(postdetails),
          this.postdesc = postdetails.post_detail;
          this.blogpostId = postdetails.post_detail.id;
          this.categoryId = postdetails.post_detail.category_id;
          //console.log(this.blogpostId) 
          this.service.getMetaPost(this.blogpostId)
            .subscribe(item => {
                  //console.log(item.post_meta);
                  if(item.status == true){
                    this.metatitle = item.post_meta.meta_title;
                    this.description = item.post_meta.meta_description;
                    this.keyboards = item.post_meta.meta_keywords;

                    this.title.setTitle(this.metatitle);
                    this.meta.addTag({ name: 'description', content: this.description });
                    this.meta.addTag({ name: 'keywords', content: this.keyboards });
                  }
                  
              })
            // Show for related article
            this.getPostWithCategory(this.categoryId);
        });

    }

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
                   //console.log(this.allItems);
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
