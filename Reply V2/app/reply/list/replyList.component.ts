import { Component, OnInit } from '@angular/core';

import { ReplySharedService } from '../../services/replyShared.service'; 

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';


@Component({
  selector: 'rr-list',
  template: `

        
    <div style="background-color:oldlace;">
    <p>Reply List Here with Eddy</p>
    </div>

    <div class="col-md-2 my-col-right">
        <p>Media Type: </p>
    </div>
    
    <div class="col-md-3">
        <div *ngFor="let mediatype of mediatypes">
            <label><input type="radio" name="mediaTypeId"
                id={{mediatype.id}}
                value={{mediatype.id}}>{{mediatype.mediaTypeName}}</label>
        </div>            
    </div>

    
    `
})
export class ReplyListComponent implements OnInit {
  /* Lookup objects */
  mediatypes: MediaType[];
  mediasources: MediaSource[];
  categories: Category[];

  constructor(private _rss: ReplySharedService) {}

 /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.mediatypes = this._rss.getMediaTypes();
    console.log('in constructor mission aft  in ngOnInit>= ', this.mediatypes);
    this.mediasources = this._rss.getMediaSources();
    console.log('in constructor mission aft  in ngOnInit>= ', this.mediasources);
    this.categories = this._rss.getCategories();
    console.log('in constructor mission aft  in ngOnInit>= ', this.categories);
  }

}
