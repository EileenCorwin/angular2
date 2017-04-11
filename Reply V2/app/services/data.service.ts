import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/* RxJs */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import 'rxjs/add/observable/forkJoin'; //trying all observables together


//Global settings
import { Config } from '../config.service';

//Models
import { MediaType } from '../models/media-type';
import { MediaSource } from '../models/media-source';
import { Category } from '../models/category';
import { Reply } from '../models/reply';
import { SPReturn } from '../models/spreturn';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  //Get Media Types & Categories at same time
  getAll() {
    return Observable.forkJoin(
      this._http.get(Config.webServicesURL + 'mediatypes')
                .map((res:Response) => res.json())
                .do(data => console.log('getMediaTypes: ' + JSON.stringify(data)))
                .catch(this.handleError),
      this._http.get(Config.webServicesURL + 'categories')
                .map((res:Response) => res.json())
                .do(data => console.log('getCategories: ' + JSON.stringify(data)))
                .catch(this.handleError)
    );
  }

  //Get Media Types - Observable
  getMediaTypes(): Observable<MediaType[]> {
    console.log('getMediaTypes');
    return this._http.get(Config.webServicesURL + 'mediatypes')
              //  .share()
               .map((res: Response) => <MediaType[]>res.json())
               .do(data => console.log('getMediaTypes: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  //Get Media Soureces - Observable
  getMediaSources(): Observable<MediaSource[]> {
    console.log('getMediaSources');
    return this._http.get(Config.webServicesURL + 'mediasources')
              //  .share()
               .map((res: Response) => <MediaSource[]>res.json())
               .do(data => console.log('getMediaSources: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  //Get Media Soureces Filtered - Observable
  getMediaSourcesFiltered(mediaTypeId: number): Observable<MediaSource[]> {
    console.log('getMediaSourcesFiltered');
    // return this._http.get(Config.webServicesURL + 'mediasources')
    return this._http.get(Config.webServicesURL + 'mediasources/' + mediaTypeId)
              //  .share()
               .map((res: Response) => <MediaSource[]>res.json())
               .do(data => console.log('getMediaSourcesFiltered: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }


  //Get Categories - Observable
  getCategories(): Observable<Category[]> {
    console.log('getCategories');
    return this._http.get(Config.webServicesURL + 'categories')
              //  .share()
               .map((res: Response) => <Category[]>res.json())
               .do(data => console.log('getCategories: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  //Get Replies - Observable
  getReplies(): Observable<Reply[]> {
    console.log('getReplies');
    return this._http.get(Config.webServicesURL + 'replies')
              //  .share()
               .map((res: Response) => <Reply[]>res.json())
               .do(data => console.log('getReplies: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

   postReply(model: Reply): Observable<SPReturn[]> {
        console.log('postReply');
        console.log(model);

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log("this is what the body looks like", body);

        return this._http.post(Config.webServicesURL + 'reply', body, options)
                         .map((res: Response) => <SPReturn[]>res.json())
                         .do(data => console.log('postReply: ' + JSON.stringify(data)))
                         .catch(this.handleError);
  }
                         
  private handleError(error: Response) {
        console.log("in handleError");

        console.error(error);
        console.error('error in service');
        return Observable.throw(error.json().error || 'Server error');
    }

} //DataService
