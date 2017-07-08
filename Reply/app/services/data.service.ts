import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

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
import { Reporter } from '../models/reporter';
import { Replier } from '../models/replier';
import { Reply } from '../models/reply';
import { SPReturn } from '../models/spreturn';
import { ListReply } from '../models/list-reply';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  getMediaTypes(): Observable<MediaType[]> {
    return this._http.get(Config.webServicesURL + 'mediatypes')
               .map((res: Response) => <MediaType[]>res.json())
              //  .do(data => console.log('getMediaTypes: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getMediaSources(): Observable<MediaSource[]> {
    return this._http.get(Config.webServicesURL + 'mediasources')
               .map((res: Response) => <MediaSource[]>res.json())
              //  .do(data => console.log('getMediaSources: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getMediaSourcesFiltered(mediaTypeId: number): Observable<MediaSource[]> {
    return this._http.get(Config.webServicesURL + 'mediasources/' + mediaTypeId)
               .map((res: Response) => <MediaSource[]>res.json())
              //  .do(data => console.log('getMediaSourcesFiltered: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getOtherMediaSources(): Observable<MediaSource[]> {
    return this._http.get(Config.webServicesURL + 'othermediasources')
               .map((res: Response) => <MediaSource[]>res.json())
              //  .do(data => console.log('getOtherMediaSources: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getCategories(): Observable<Category[]> {
    return this._http.get(Config.webServicesURL + 'categories')
               .map((res: Response) => <Category[]>res.json())
              //  .do(data => console.log('getCategories: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getReporters(): Observable<Reporter[]> {
    return this._http.get(Config.webServicesURL + 'reporters')
               .map((res: Response) => <Reporter[]>res.json())
              //  .do(data => console.log('getReporters: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getOtherReporters(): Observable<Reporter[]> {
    return this._http.get(Config.webServicesURL + 'otherreporters')
               .map((res: Response) => <Reporter[]>res.json())
              //  .do(data => console.log('getOtherReporters: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getRepliers(): Observable<Replier[]> {
    return this._http.get(Config.webServicesURL + 'repliers')
               .map((res: Response) => <Replier[]>res.json())
              //  .do(data => console.log('getRepliers: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getReplies(query: any): Observable<ListReply[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let params: URLSearchParams = new URLSearchParams();
    for(let key in query){
      params.set(key.toString(), query[key]);
      // console.log('key.toString=',key.toString(), ' and value=', query[key]);
    }
    
    options.search = params;    

    return this._http.get(Config.webServicesURL + 'replies', options)
               .map((res: Response) => <ListReply[]>res.json())
               .do(data => console.log('getReplies in dataservice: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  getReplyById(replyeId: number): Observable<Reply> {
    return this._http.get(Config.webServicesURL + 'reply/' + replyeId)
               .map((res: Response) => <Reply>res.json())
               .do(data => console.log('getReplyById: ' + JSON.stringify(data)))
               .catch(this.handleError);
  }

  postReply(model: Reply): Observable<SPReturn> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(Config.webServicesURL + 'reply', body, options)
                      .map((res: Response) => <SPReturn>res.json())
                      // .do(data => console.log('postReply: ' + JSON.stringify(data)))
                      .catch(this.handleError);
  }
                         
  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

} //DataService
