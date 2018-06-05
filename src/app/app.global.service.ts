import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {

  constructor() { }

  readonly baseAppUrl: string = 'http://www.codingprogrammer.com/cp/';
  readonly baseAPIUrl: string = 'http://www.codingprogrammer.com/api/';
}
