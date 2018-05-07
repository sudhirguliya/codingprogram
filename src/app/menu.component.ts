import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Features } from './shared/models/features';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { GlobalEventsManager } from "./_services/global-events-manager";

@Component({
  selector: 'nav',
  templateUrl: './menu.component.html'
})

export class MenuComponent {

    showNavBar: boolean = false;
    //featureList: Features[] = [];
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        /*private http: Http, private router: Router, 
        private globalEventsManager: GlobalEventsManager*/
        ) {

        /*this.globalEventsManager.showNavBar.subscribe((mode: any) => {
            this.showNavBar = mode;

            if (this.showNavBar = true) {
                //the below function expects user id, here I have given as 1
                this.getFeatureListByLoggedInUser(1)
                    .then(list => { this.featureList = list; });
            }
        });

        this.globalEventsManager.hideNavBar.subscribe((mode: any) => {
            this.showNavBar = false;
            this.featureList = [];
        });*/
    }

    /*private getFeatureListByLoggedInUser(userID: number): Promise<Features[]> {
        return this.http.get(your api url + '/Feature/GetFeatureListByUserID?userID=' + userID)
            .toPromise()
            .then(response => response.json() as Features[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }*/
}