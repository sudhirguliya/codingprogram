import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '../shared/models/category';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AboutUsersResolve implements Resolve<Category> {

  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getUsers().then(users => users);
  }

}