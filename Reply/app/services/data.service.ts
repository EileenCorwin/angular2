import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/* RxJs */
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Observable';
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

  //POST Replies - Observable     
  // postReply(model: Reply): Observable<any> {
  postReply(model: Reply): Observable<SPReturn[]> {
        console.log('postReply');
        console.log(model);

        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log("this is what the body looks like", body);

        return this._http.post(Config.webServicesURL + 'reply', body, options)
                         .map((res: Response) => <SPReturn[]>res.json())
                        //  .map((res: Response) => <SPReturn[]>res[0].json())
                        //  .map(res =>  res[0].json().data)
                        //  .map(res =>  res.json().data)
                         .do(data => console.log('postReply: ' + JSON.stringify(data)))
                         .catch(this.handleError);
                        // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                        // .catch(console.log(error.json().error || 'Server error'));
  }
                         
  private handleError(error: Response) {
        console.log("in handleError");

        console.error(error);
        console.error('error in service');
        return Observable.throw(error.json().error || 'Server error');
    }

// private handleError (error: Response | any) {
//   console.log("handleError");
//     // In a real world app, you might use a remote logging infrastructure
//     let errMsg: string;
//     if (error instanceof Response) {
//       const body = error.json() || '';
//       const err = body.error || JSON.stringify(body);
//       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//     } else {
//       errMsg = error.message ? error.message : error.toString();
//     }
//     console.error(errMsg);
//     return Observable.throw(errMsg);
//   }



} //DataService
