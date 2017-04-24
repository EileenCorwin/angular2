// Angular
import { Injectable } from '@angular/core';

// RxJs
import { Observable } from 'rxjs/Observable';

// App models
import { MediaType } from '../models/media-type';
import { MediaSource } from '../models/media-source';
import { Category } from '../models/category';

// App services
import { DataService } from '../services/data.service';


@Injectable()
export class ReplySharedService {
  /* Lookup objects */
  mediatypes: MediaType[];
  mediasources: MediaSource[];
  categories: Category[];

  /* Miscellnaeous */
  errorMessage: string;

  constructor(private _ds: DataService) {}

  retrieveAllLookupData(): void {
    this._ds.getMediaTypes().subscribe(
                                      data => this.mediatypes = data, 
                                      error => {this.errorMessage = <any>error, console.log('getMediaTypes error', this.errorMessage);},
                                      () => console.log ("getMediaTypes in ReplySharedService done", this.mediatypes)
                                      );
    this._ds.getMediaSources().subscribe(
                                      data => this.mediasources = data, 
                                      error => {this.errorMessage = <any>error, console.log('getMediaSources error', this.errorMessage);},
                                      () => console.log ("getMediaSources in ReplySharedService done", this.mediasources)
                                      );
    this._ds.getCategories().subscribe(
                                      data => this.categories = data, 
                                      error => {this.errorMessage = <any>error, console.log('getCategories error', this.errorMessage);},
                                      () => console.log ("getCategories in ReplySharedService done", this.categories)
                                      );
  }

  getMediaTypes() {
    console.log('in shared getMediaTypes:');
    return this.mediatypes;
  }

  getMediaSources() {
    console.log('in shared getMediaSources:');
    return this.mediasources;
  }

  getMediaSourcesFiltered(_mediaTypeId: number) {
    console.log('in shared getMediaSourcesFiltered:');
    return this.mediasources.filter(mediasource => mediasource.mediaTypeId == _mediaTypeId)
  }

  getCategories() {
    console.log('in shared getCategories:');
    return this.categories;
  }

}
