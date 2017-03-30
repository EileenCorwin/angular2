import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

/* RxJs */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';


//Global settings
import { Config } from '../config.service';

//Models
import { MediaType } from '../models/media-type';
import { MediaSource } from '../models/media-source';
import { Category } from '../models/category';
import { Reply } from '../models/reply';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  //Get Media Types - Observable
  getMediaTypes(): Observable<MediaType[]> {
    console.log('getMediaTypes');
    return this._http.get(Config.webServicesURL + 'mediatypes')
              //  .share()
               .map((response: Response) => <MediaType[]>response.json())
               .do(data => console.log('getMediaTypes: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  //Get Media Soureces - Observable
  getMediaSourcesFiltered(mediaTypeId: number): Observable<MediaSource[]> {
    console.log('getMediaSourcesFiltered');
    // return this._http.get(Config.webServicesURL + 'mediasources')
    return this._http.get(Config.webServicesURL + 'mediasources/' + mediaTypeId)
              //  .share()
               .map((response: Response) => <MediaSource[]>response.json())
               .do(data => console.log('getMediaSourcesFiltered: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }


  //Get Categories - Observable
  getCategories(): Observable<Category[]> {
    console.log('getCategories');
    return this._http.get(Config.webServicesURL + 'categories')
              //  .share()
               .map((response: Response) => <Category[]>response.json())
               .do(data => console.log('getCategories: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  //Get Replies - Observable
  getReplies(): Observable<Reply[]> {
    console.log('getReplies');
    return this._http.get(Config.webServicesURL + 'replies')
              //  .share()
               .map((response: Response) => <Reply[]>response.json())
               .do(data => console.log('getReplies: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  private handleError(error: Response) {
        console.log('An error occurred', error.status); // for demo purposes only
        return Observable.throw(error.json().error || 'Server error');
  }

} //DataService
