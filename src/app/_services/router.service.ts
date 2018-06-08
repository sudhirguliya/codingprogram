import { Injectable, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AppGlobals } from '../app.global.service';
import { Category } from '../shared/models/category';
import { PostDetails } from '../shared/models/postdetails';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class RouterService {
    constructor(private http: Http, private _global: AppGlobals) { }

    getLatestPost(page: number = 1) {
        //console.log('Page no '+page);
        return this.http.get(this._global.baseAPIUrl +`coding/all_post?page=${page}`)
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
            });
    }

    getCountCategories() {
        return this.http.get(this._global.baseAPIUrl +'coding/count_with_category').map((res) => res.json());
    }

    getCategories() {
        return this.http.get(this._global.baseAPIUrl +'coding/categories').map((res) => res.json());
    }
    getCategory(category: Category) {
        var obj = { category_link: category };

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);

        return this.http.post(this._global.baseAPIUrl +'coding/category',   body, options).map((res) => res.json());
    }

    getPost(category: Category, post : string) {
        var obj = { category_link: category, post : post };

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);

        return this.http.post(this._global.baseAPIUrl +'coding/posturl',   body, options).map((res) => res.json());
    }

    getMetaPost(category: number) {
        var obj = { post_id : category };
        //console.log(obj);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);

        return this.http.post(this._global.baseAPIUrl +'coding/metapost',   body, options).map((res) => res.json());
    }

    postDetails( post : string) {
    /*var obj = { post : post };

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);*/

        return this.http.get(this._global.baseAPIUrl +'coding/postdetails?post='+post).map((res) => res.json());
    }

/*postDetails(post: string): Promise<any> {
    return this.http.get(this._global.baseAPIUrl +'coding/postdetails?post=' + post)
        .toPromise()
        .then(response => response.json())
        .then(postinfo => new PostDetails(postinfo.post_detail))
        .catch(error => console.log(error));
}*/
    
    postRandom() {
    /*var obj = { post : post };

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

        let body = this.serializeObj(obj);*/

        return this.http.get(this._global.baseAPIUrl +'coding/postrandom?limit=5').map((res) => res.json());
    }

    // private helper methods

    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }
    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}