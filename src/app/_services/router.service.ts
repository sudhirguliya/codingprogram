import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AppGlobals } from '../app.global.service';
//import { Category } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class RouterService {
    constructor(private http: Http, private _global: AppGlobals) { }

    

   

getCategories() {
        return this.http.get(this._global.baseAPIUrl +'coding/categories').map((res) => res.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}