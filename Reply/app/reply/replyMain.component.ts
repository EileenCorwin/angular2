//Angular modules
import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { ReplySharedService } from '../services/replyShared.service';

import { Reply } from '../models/reply'; 
import { ReplyInitialize } from '../models/reply';
import { ListSelectionInitialize } from '../models/list-selection'; 

@Component({
  moduleId: module.id,
  selector: 'my-main',
  templateUrl: './replyMain.component.html',
  styleUrls: [ './replyMain.component.css', './shared/replyShared.css' ],

  providers: [DataService, ReplySharedService]
})
export class ReplyMainComponent {
  visibleComponent: string;

  constructor(private _rss: ReplySharedService) {} 

  //Controls which component is visible
  setVisibleComponent(_visibleComponent: string){
    this.visibleComponent = _visibleComponent;
    this._rss.currentComponent = this.visibleComponent;
  }

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.visibleComponent = 'main';
    this._rss.currentComponent = this.visibleComponent;

    this._rss.retrieveAllLookupData();

    //initialize reply
    this._rss.reply = ReplyInitialize;
    this._rss.reply.subscriberId = this._rss.loggedinSubscriberId; //!!!TEMP

    //initialize selections
    this._rss.selections = ListSelectionInitialize;
  }
  
}
