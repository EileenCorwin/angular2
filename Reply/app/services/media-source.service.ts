import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MediaSource } from '../models/media-source';
// import { MEDIASOURCES } from '../mock-data/mock-media-sources';

@Injectable()
export class MediaSourceService {

  // private serviceURL = 'api/mediasources';
  private serviceURL = 'http://localhost:8081/mediasources';

  constructor(private http: Http) { }

  // getMediaSourcesALL(): Promise<MediaSource[]> {
  //   return this.http.get(this.mediasourcesURL)
  //              .toPromise()
  //              .then(response => response.json().data as MediaSource[])
  //              .catch(this.handleError);
  //   }
 
  getMediaSourcesFiltered(mediaTypeId: number): Promise<MediaSource[]> {
    console.log(this.serviceURL); //for testing only
    return this.http.get(this.serviceURL)
    
    // const url = `${this.serviceURL}` + "/?mediaTypeId=" + `${mediaTypeId}`;
    // console.log(url); //for testing only
    // return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as MediaSource[])
      .catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }

  //B4 HTTP mock services
  // getMediaSourcesALL(): MediaSource[] {
  //   return MEDIASOURCES;
  // }


  //   getMediaSourcesALL(): Promise<MediaSource[]> {
  //   return Promise.resolve(MEDIASOURCES);
  // } 


  /*
  getMediaSources(id: number): Promise<MediaSource[]> {
    return this.getMediaSources()
               .then(mediasources => mediasources.find(mediasource => mediasource.mediatypeid === id));
  }
  */

}
