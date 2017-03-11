import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category } from '../objects/category';
// import { CATEGORIES } from '../mock-data/mock-categories'; //B4 HTTP mock services

@Injectable()
export class CategoryService {

  private serviceURL = 'api/categories';

  constructor(private http: Http) { }

  getCategories(): Promise<Category[]> {
    return this.http.get(this.serviceURL)
               .toPromise()
               .then(response => response.json().data as Category[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
	
  //B4 HTTP mock services
  // getCategories(): Promise<Category[]> {
  //   return Promise.resolve(CATEGORIES);
  // }
}
