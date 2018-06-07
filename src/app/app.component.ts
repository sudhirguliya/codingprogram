import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'app-root',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  template: '<router-outletmm></router-outletmm>',
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Goconsult!';
  constructor(public router: Router) {}


  ngOnInit(): void {
  	//alert($('.app-loading').length);
    //if($('.app-loading').length){
      $('.app-loading').delay(200).fadeOut(500);
    //}
  }
  
  selectedIndex = -1;

  setSelected(id: number) {
    this.selectedIndex = id;
  }

  
}
