import { Component, EventEmitter, Output } from '@angular/core';

import { ReplySharedService } from '../../../services/replyShared.service';

import { ReplyInitialize } from '../../../models/reply';

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: [ `./header.component.css`, '../replyShared.css' ]
})
export class HeaderComponent {
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  constructor(private _rss: ReplySharedService) {}

  ngOnInit(): void {
    this._rss.currentComponent = "main";
    this._rss.changeMenuColors();
  }

  /* Controls which component is visible */
  onMenuSelection(_visibleComponent: string){
    this.setVisibleComponent.emit(_visibleComponent);

    this._rss.currentComponent = _visibleComponent;

    /* menu selections don't act like regular active anchor tags because these anchor tags are not URL redirects
       need to change font color for selected and not selected menu options */
    let elementId: string = "a-" + _visibleComponent;

    this._rss.changeMenuColors();

    //initialize reply
    this._rss.reply = ReplyInitialize;
    this._rss.reply.subscriberId = this._rss.loggedinSubscriberId; //!!!TEMP

    document.getElementById(elementId).blur();

  } //onMenuSelection
  
} //export
