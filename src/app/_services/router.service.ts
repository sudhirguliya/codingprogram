import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AppGlobals } from '../app.global.service';
import { Category } from '../shared/models/category';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class RouterService {
    constructor(private http: Http, private _global: AppGlobals) { }

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