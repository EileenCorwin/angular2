//Angular modules
import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { ReplySharedService } from '../services/replyShared.service'; 

@Component({
  moduleId: module.id,
  selector: 'my-main',
  templateUrl: './replyMain.component.html',
  styleUrls: [ './replyMain.component.css', './shared/replyShared.css' ],

  providers: [DataService, ReplySharedService]
})
export class ReplyMainComponent {
  visibleComponent: string;

  //Controls which component is visible
  setVisibleComponent(_visibleComponent: string){
    console.log('replyMainC setVisibleComponent ', _visibleComponent);
    this.visibleComponent = _visibleComponent;
  }

  constructor(private _rss: ReplySharedService) {} 

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.visibleComponent = 'main';

    console.log('just b4 call retrieveAllLookupData');
    this._rss.retrieveAllLookupData();
    console.log('just aft call retrieveAllLookupData');
  }
  
}
