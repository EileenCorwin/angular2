import { Injectable } from '@angular/core';

import { Category } from '../objects/category';
import { CATEGORIES } from '../mock-data/mock-categories';

@Injectable()
export class CategoryService {
	
  getCategories(): Promise<Category[]> {
    return Promise.resolve(CATEGORIES);
  }
}
