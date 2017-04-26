import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';  

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reply } from '../../models/reply';
import { SPReturn } from '../../models/spreturn';

@Component({
  moduleId: module.id,
  selector: 'my-confirm',
  templateUrl: './replyConfirm.component.html',
  styleUrls: [ './replyConfirm.component.css' ],
  providers: [DataService]
})

export class ReplyConfirmComponent implements OnInit {
  /* Shared Visible Component objects */
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  /* Lookup objects */
  selectedMediaType: MediaType;
  selectedCategory: Category;
  selectedMediaSource: MediaSource;
  
  reply: Reply;
  spreturn: SPReturn;
  spreturns: SPReturn[] = [];

  errorMessage: string;

  constructor(private _rss: ReplySharedService, private _ds: DataService) {}

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    // this.selectedMediaType = this._rss.selectedMediaType_Create;
    this.selectedMediaType = this._rss.mediatypes.find(mediatype => mediatype.id == this._rss.selectedMediaTypeId_Create)
console.log('selectedMediaType = ', this._rss.selectedMediaTypeId_Create, this.selectedMediaType);

    this.selectedMediaSource = this._rss.selectedMediaSource_Create;
    // this.selectedCategory = this._rss.selectedCategory_Create;
    this.selectedCategory = this._rss.categories.find(category => category.id == this._rss.selectedCategoryId_Create)
console.log('selectedCategory = ', this._rss.selectedCategoryId_Create, this.selectedCategory);

    this.reply = this._rss.reply;

    

    console.log('reply=', this.reply);
  } //ngOnInit

  

  /***************/ 
  /* Submit Form */ 
  /***************/ 
  // submitForm(model: Reply, isValid: boolean) {
  //     // this.submitted = true; // set form submit to true

  //     model.mediaSourceId = this.ac_source.id;
      
  //     // check if model is valid
  //     // if valid, call API to save customer
  //     console.log("save ", model, isValid);

  //     // this.postReply(model);
  //     console.log("in postReply in component");
  //     this._dataService.postReply(model).subscribe(data => this.spreturns = data, 
  //                                                 //  err => {this.errorMessage = <any>err; console.log("ERROR in postReply: "+ err);},
  //                                                 //  err => console.log("ERROR in postReply: "+ err),
  //                                                 err => console.log("ERROR in postReply: ", err),
  //                                                 () => console.log ("postReply done", this.spreturns));
  //     console.log("exiting postReply in component");

  //     this.setVisibleComponent.emit("list");

  //   }

    buttonSaveClick() {
      console.log("buttonSaveClick");

      console.log("in postReply in component, reply = ", this.reply);
      this._ds.postReply(this.reply).subscribe(data => this.spreturns = data, 
                                                  //  err => {this.errorMessage = <any>err; console.log("ERROR in postReply: "+ err);},
                                                  //  err => console.log("ERROR in postReply: "+ err),
                                                  err => console.log("ERROR in postReply: ", err),
                                                  () => console.log ("postReply done", this.spreturns));
      console.log("exiting postReply in component");
      
      this._rss.selectedMediaTypeId_Create = null;
      this._rss.selectedMediaSource_Create = null;
      this._rss.selectedCategoryId_Create = null;
      this._rss.reply = null;
      this.setVisibleComponent.emit("create");
      }

     buttonReturnClick() {
      console.log("buttonReturnClick");

      this.setVisibleComponent.emit("create");
      }

}
