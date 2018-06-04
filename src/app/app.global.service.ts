import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {

  constructor() { }

  readonly baseAppUrl: string = 'http://localhost:4000';
  readonly baseAPIUrl: string = 'http://www.codingprogrammer.com/api/';
}
