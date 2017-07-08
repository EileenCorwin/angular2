import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';  

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reply } from '../../models/reply';
import { ReplyInitialize } from '../../models/reply';
import { SPReturn } from '../../models/spreturn';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'my-confirm',
  templateUrl: './replyConfirm.component.html',
  styleUrls: [ './replyConfirm.component.css', '../shared/replyShared.css' ],
  providers: [DataService]
})

export class ReplyConfirmComponent implements OnInit {
  /* Shared Visible Component objects */
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  selectedMediaTypeName: string;
  selectedMediaSourceName: string;
  selectedCategoryName: string;
  selectedReporterName: string;
  
  reply: Reply;
  spreturn: SPReturn;
  spreturns: SPReturn[] = [];

  errorMessage: string;

  constructor(private _rss: ReplySharedService, private _ds: DataService) {}

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.reply = this._rss.reply;
    
    this.selectedMediaTypeName = this._rss.mediatypes.find(mediatype => mediatype.id == this.reply.mediaTypeId).mediaTypeName;

    if (this.reply.mediaSourceId == 0) {
      this.selectedMediaSourceName = this.reply.otherMediaSourceName;
    }
    else {
      this.selectedMediaSourceName = this._rss.mediasources.find(mediasource => mediasource.id == this.reply.mediaSourceId).mediaSourceName;
    }

    this.selectedCategoryName = this._rss.categories.find(category => category.id == this.reply.categoryId).categoryName;

    if (this.reply.reporterId == 0) {
      this.selectedReporterName = this.reply.otherReporterName;
    }
    else {
      this.selectedReporterName = this._rss.reporters.find(reporter => reporter.id == this.reply.reporterId).reporterName;
    }

  } //ngOnInit

  

  /***********/ 
  /* Buttons */ 
  /***********/ 
  /* Submit */
  buttonSaveClick() {
    /* post the reply */
    this._ds.postReply(this.reply).subscribe(
      data => this.spreturn = data, 
      err => console.log("ERROR in postReply: ", err, 'this.spreturns = ', this.spreturns),
      () => {
              /* return */
              if (this.spreturn.ReturnVal == -1) {
                $('#errormessage').modal('show');
              }
              
              /* submit, post and refresh */
              else {
                /* refresh some selection recordsets that could be changed by the post reply */
                // refresh other media sources if new other
                if (this._rss.reply.mediaSourceId == 0) {
                  if (!this._rss.othermediasources.find(othermediasource => othermediasource.mediaSourceName == this._rss.reply.otherMediaSourceName)) {
                    this._ds.getOtherMediaSources().subscribe(
                                              data => this._rss.othermediasources = data, 
                                              error => {this.errorMessage = <any>error, console.log('getOtherMediaSources error', this.errorMessage);},
                                              () => console.log ("getOtherMediaSources in buttonReturnClick = ", this._rss.othermediasources)
                                              );
                  }
                }; 

                // refresh other reporters if new other
                if (this._rss.reply.reporterId == 0) {
                  if (!this._rss.otherreporters.find(otherreporter => otherreporter.reporterName == this._rss.reply.otherReporterName)) {
                        this._ds.getOtherReporters().subscribe(
                                                data => this._rss.otherreporters = data, 
                                                error => {this.errorMessage = <any>error, console.log('getOtherReporters error', this.errorMessage);},
                                                () => console.log ("getOtherReporters in buttonReturnClick = ", this._rss.reporters)
                                                );
                  }
                };

                // refresh repliers if new subscriber
                if (!this._rss.repliers.find(replier => replier.id == this._rss.reply.subscriberId)) {
                  this._ds.getRepliers().subscribe(
                                        data => this._rss.repliers = data, 
                                        error => {this.errorMessage = <any>error, console.log('getRepliers error', this.errorMessage);},
                                        () => console.log ("getRepliers in buttonReturnClick = ", this._rss.repliers)
                                        );

                };  

                /* end refresh-------------------------------------------------------------- */
                
                $('#successmessage').modal('show');
                
                this._rss.reply = ReplyInitialize;
                this._rss.reply.subscriberId = this._rss.loggedinSubscriberId; //!!!TEMP
                this.setVisibleComponent.emit("create");
              }
            }
    );

  } //buttonSaveClick  

  /* Return */
  buttonReturnClick() {
   this.setVisibleComponent.emit("create");
  }

} //export
