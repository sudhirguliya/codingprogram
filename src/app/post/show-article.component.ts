import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'show-article',
  template: `
      <ul class="new-article clearfix">
          <li><a href="#"><span class="fa fa-angle-left"></span> &ensp; &ensp; &ensp; &ensp; Previous Article</a></li>
          <li><a href="#">Next Article &ensp; &ensp; &ensp; &ensp; <span class="fa fa-angle-right"></span></a></li>
      </ul>
  `
})
export class ShowArticleComponent {

  @Input() article : any;

  constructor() { }

  ngOnInit() {
      console.log(this.article);
  }
}