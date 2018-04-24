import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() { }

  readonly baseAppUrl: string = 'http://localhost:4200/';
  readonly baseAPIUrl: string = 'https://api.github.com/';
}
