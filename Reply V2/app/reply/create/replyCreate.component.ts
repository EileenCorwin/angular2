import { Component, OnInit } from '@angular/core';

import { ReplySharedService } from '../../services/replyShared.service'; 

//Models and Services
import { MediaType } from '../../models/media-type';

@Component({
  selector: 'rr-create',
  template: `
       
    <div style="background-color:oldlace;">
    <p>Reply Create Here</p>
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
export class ReplyCreateComponent implements OnInit {
   mediatypes: MediaType[];

  constructor(private _rss: ReplySharedService) {}

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.mediatypes = this._rss.getMediaTypes();
    console.log('in constructor mission aft  in ngOnInit>= ', this.mediatypes);
  } 
}
