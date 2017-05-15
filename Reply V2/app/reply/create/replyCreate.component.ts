import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */

import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';  

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reply } from '../../models/reply';
import { SPReturn } from '../../models/spreturn';

import { MediaTypePlaceHolder } from '../../models/media-type';
import { MediaSourceInit } from '../../models/media-source';
import { CategoryPlaceHolder } from '../../models/category';
import { ReplyInitialize } from '../../models/reply';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'my-create',
  templateUrl: './replyCreate.component.html',
  // styleUrls: [ './replyCreate.component.css',  '../shared/sidenav.css',  '../shared/replyShared.css'],
  styleUrls: [ './replyCreate.component.css',  '../shared/replyShared.css'],
  providers: [DataService]
})

export class ReplyCreateComponent implements OnInit {
  /* Shared Visible Component objects */
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  /* Lookup objects */
  mediatypes: MediaType[];
  mediasources: MediaSource[];
  categories: Category[];

  /* Replies */
  reply: Reply;

  spreturn: SPReturn;
  spreturns: SPReturn[] = [];

  /* Model Form stuff */
  public replyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; 

  /* PrimeNG variables */
  ac_source: MediaSource = MediaSourceInit;
  ac_sources: MediaSource[]=[];
  ac_filteredSources: any[];
  acDisabled: boolean = true;

  /* Miscellaneous */
  selectedMediaType: MediaType;
  selectedCategory: Category;

  selectedMediaTypeId: number;
  selectedMediaSource: MediaSource = null;
  selectedCategoryId: number;
    
  neversubmitted: boolean;
  errorMessage: string;

  eventArray: number[]=[];

  constructor(private _rss: ReplySharedService, private _dataService: DataService, private _fb: FormBuilder) {}
  
  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    console.log('in replyCreate');
    /* initialize mediatypes */
    this.mediatypes = this._rss.mediatypes;
    // this.selectedMediaType = this._rss.selectedMediaType_Create;
    this.selectedMediaTypeId = this._rss.selectedMediaTypeId_Create;
    // add placeholder if no selection made and placeholder not there (auto-updates shared recordset)
    // if (!this.selectedMediaTypeId && this.mediatypes[0].id != -1) {
    //   this.mediatypes.unshift(MediaTypePlaceHolder);
    //   this.selectedMediaTypeId = this.mediatypes[0].id;
    // }
    // // remove placeholder if selection made and placeholder there (auto-updates shared recordset)
    // else if (this.selectedMediaTypeId && this.mediatypes[0].id === -1) {
    //   this.mediatypes.shift();
    // }

    /* initialize mediasources */
    //nothing happens yet with the control
    if (this._rss.selectedMediaSource_Create) {
      this.ac_source = this._rss.selectedMediaSource_Create;
    }
    
    /* initialize categories */
    this.categories = this._rss.categories;
    // this.selectedCategory = this._rss.selectedCategory_Create;
    this.selectedCategoryId = this._rss.selectedCategoryId_Create;
    // add placeholder if no selection made and placeholder not there (auto-updates shared recordset)
    // if (!this.selectedCategoryId && this.categories[0].id != -1) {
    //   this.categories.unshift(CategoryPlaceHolder);
    //   this.selectedCategoryId = this.categories[0].id;
    // }
    // // remove placeholder if selection made and placeholder there (auto-updates shared recordset)
    // else if (this.selectedCategoryId && this.categories[0].id === -1) {
    //   this.categories.shift();
    // }

    /* initialize reply form */
    console.log('intializing prior=', this._rss.priorComponent, ' and reply=', this._rss.selectedReply);

    /* coming from list component, selected reply */
    if (this._rss.priorComponent === 'list') {
// console.log('if from list');
      // get selected reply values
      this.reply = this._rss.selectedReply;
      
      // get media sources based on media type of the reply
      this.eventArray = [];
      this.eventArray.push(this.reply.mediaTypeId);
      this.mediasources = this._rss.getMediaSourcesFiltered(this.eventArray);
      
      // clear reply text
      this.reply.replyText = "";
    }
    /* coming from menu selection "Reply" */
    else {
// console.log('if NOT from list', this._rss.reply);
      this.reply = this._rss.reply;
    }

    // this.reply = this._rss.reply;
    if (!this.reply) {this.reply = ReplyInitialize}; // initialize if empty

console.log('in create init this.reply=', this.reply);

    this.replyForm = this._fb.group({
      // mediaTypeId: ['', <any>Validators.required],
      mediaTypeId: [this.reply.mediaTypeId, <any>Validators.required],
      mediaSourceId: [this.reply.mediaSourceId, <any>Validators.required],
      categoryId: [this.reply.categoryId, <any>Validators.required],
      title: [this.reply.title, [<any>Validators.required, <any>Validators.minLength(5)]],
      reporter: [this.reply.reporter, [<any>Validators.required, <any>Validators.minLength(5)]],
      // articleDate: date,
      replyText: [this.reply.replyText, [<any>Validators.required, <any>Validators.minLength(5)]]          
    }); 

    this.neversubmitted = true;
  } //ngOnInit

  /*******************/
  /* After View Init */
  /*******************/
  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();
    $('#mediatype').dropdown();
    $('#mediasource').dropdown();
    $('#category').dropdown();

    // $('#mediatype').dropdown('set selected', this.reply.mediaTypeId);
    // $('#mediasource').dropdown('set selected', '5');
    // $('#category').dropdown('set selected', '7');
  }

  /**************/
  /* On Selects */
  /**************/
  // onSelectType(_id: number): void {
  onSelectType(event): void {
    this.selectedMediaTypeId = event;

    this.eventArray = [];
    this.eventArray.push(event);
    
    // get filter list of sources
    this.mediasources = this._rss.getMediaSourcesFiltered(this.eventArray);    
    // this.mediasources = this._rss.getMediaSourcesFiltered(_id);
    // this.mediasources = this._rss.getMediaSourcesFiltered(event.id);
    // this.mediasources = this._rss.getMediaSourcesFiltered(event);
   

    // if a source was selected, clear it out
    if (this.ac_source!=null){
      this.ac_source=null;
    }

    // reset auto-complete source stuff
    this.acDisabled = false;
    this.ac_sources = this.mediasources
  } //onSelectType

  onSelectSource(_ac_source: MediaSource): void {
    this.ac_source = _ac_source;
    this.selectedMediaSource = _ac_source;

    console.log("onSelectSource", _ac_source);
  }

  // onSelectCatergory(_id: number): void {
  onSelectCategory(event): void {
    console.log('onSelectCatergory event = ', event);
    this.selectedCategoryId = event;
    // console.log("_selectedCategory", _id);
  }

  /************************/
  /* PrimeNG AutoComplete */
  /************************/
  filterSources(event) {
    let ac_found: boolean = false;
    this.ac_sources = this.mediasources
    this.ac_filteredSources = [];
    
    for(let i = 0; i < this.ac_sources.length; i++) {
        let ac_source = this.ac_sources[i];
        if(ac_source.mediaSourceName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.ac_filteredSources.push(ac_source);

            ac_found = true;
            console.log("hit");
        }
    }

    if (!ac_found) {
      this.ac_sources = this.mediasources;
      this.ac_source = null;

      console.log("no hit");
    }
  }
   
  handleSourceDropdownClick() {
      this.ac_filteredSources = [];
      
      //mimic remote call
      setTimeout(() => {
          this.ac_filteredSources = this.mediasources;
      // }, 100)
      }, 1)
    }

  /***************/ 
  /* Submit Form */ 
  /***************/ 
  submitForm(model: Reply, isValid: boolean) {
      // this.submitted = true; // set form submit to true

      model.mediaSourceId = this.ac_source.id;

      
      console.log('submitForm model = ', model);
      
      // // check if model is valid
      // // if valid, call API to save customer
      // console.log("save ", model, isValid);

      // // this.postReply(model);
      // console.log("in postReply in component");
      // this._dataService.postReply(model).subscribe(data => this.spreturns = data, 
      //                                             //  err => {this.errorMessage = <any>err; console.log("ERROR in postReply: "+ err);},
      //                                             //  err => console.log("ERROR in postReply: "+ err),
      //                                             err => console.log("ERROR in postReply: ", err),
      //                                             () => console.log ("postReply done", this.spreturns));
      // console.log("exiting postReply in component");

      // this.setVisibleComponent.emit("list");

      /* save reply data */
      this._rss.selectedMediaTypeId_Create = this.selectedMediaTypeId;
      this._rss.selectedMediaSource_Create = this.selectedMediaSource;
      this._rss.selectedCategoryId_Create = this.selectedCategoryId;
      this._rss.reply = model;

      console.log('this._rss.selectedMediaTypeId_Create = ', this._rss.selectedMediaTypeId_Create);
      console.log('this._rss.selectedMediaSource = ', this._rss.selectedMediaSource_Create);
      console.log('this._rss.selectedCategoryId_Create = ', this._rss.selectedCategoryId_Create);
      console.log('this._rss.reply = ', this._rss.reply);
      
      
      this.setVisibleComponent.emit("confirm");
      

    }

    buttonClick() {
      console.log("buttonClick");
      this.neversubmitted = false;
      console.log("neversubmitted = ", this.neversubmitted);
      }

}
