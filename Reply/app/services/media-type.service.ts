import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MediaType } from '../objects/media-type';
// import { MEDIATYPES } from '../mock-data/mock-media-types'; //B4 HTTP mock services

@Injectable()
export class MediaTypeService {

  private serviceURL = 'api/mediatypes';

  constructor(private http: Http) { }

  getMediaTypes(): Promise<MediaType[]> {
    return this.http.get(this.serviceURL)
               .toPromise()
               .then(response => response.json().data as MediaType[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  //B4 HTTP mock services
  // getMediaTypes(): Promise<MediaType[]> {
  //   return Promise.resolve(MEDIATYPES);
  // }
}
