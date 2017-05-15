import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,  } from '@angular/forms'; /* for model form */


import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';   

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reply } from '../../models/reply';
import { ReplyDisplay } from '../../models/reply-display';

import { MediaTypePlaceHolder } from '../../models/media-type';
import { CategoryPlaceHolder } from '../../models/category';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'my-list',
  templateUrl: './replyList.component.html',
  styleUrls: [ './replyList.component.css',  '../shared/sidenav.css',  '../shared/replyShared.css'],
  providers: [DataService]
})

export class ReplyListComponent implements OnInit, AfterViewInit {
  /* Shared Visible Component objects */
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  /* Lookup objects */
  mediatypes: MediaType[];
  mediasources: MediaSource[];
  categories: Category[];

  /* Replies */
  // reply: Reply;
  // replies: Reply[] = [];
  replies: ReplyDisplay[] = [];

  /* Model Form stuff */
  public replyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = [];

  /* PrimeNG variables */
  ac_source: MediaSource;
  ac_sources: MediaSource[]=[];
  ac_filteredSources: any[];
  acDisabled: boolean = true;

  /* Miscellaneous */
  selectedMediaTypeId: number;
  selectedMediaSourceId: number;
  selectedMediaSource: MediaSource = null;
  selectedCategoryId: number;

  neversubmitted: boolean;
  errorMessage: string;

  //??????
  selectedMediaType: MediaType;

  constructor(private _rss: ReplySharedService, private _ds: DataService, private _fb: FormBuilder) {}

  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();
    $('#mediatype').dropdown();
    $('#mediasource').dropdown();
    $('#cateogry').dropdown();
    // $('#skills').dropdown();
    // $('#cateogry-select').dropdown();
    // $('#skills-select').dropdown();

    console.log('ngAfterViewInit');

    // var selectedvalues = ['1', '3'];
    // console.log('selectedvalues = ', selectedvalues);
    // $('#mediatype').dropdown('set selected', selectedvalues);
    // $('#mediatype').dropdown('set selected', ['1', '3']);
    // $('#mediatype').dropdown('set selected', '1');
  }

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.mediatypes = this._rss.getMediaTypes();
    console.log('in replyList in ngOnInit>= ', this.mediatypes);

    // this.mediatypes.unshift(MediaTypePlaceHolder);
    // this.selectedMediaTypeId = this.mediatypes[0].id;
    console.log('this.selectedMediaType', this.selectedMediaType);
    
    this.categories = this._rss.getCategories();
    console.log('in replyList   in ngOnInit>= ', this.categories);
    // this.categories.unshift(CategoryPlaceHolder);
    // this.selectedCategoryId = this.categories[0].id;
    // console.log('this.selectedMediaType', this.selectedMediaType);


    /*******************/
    /* formGroup Stuff */
    /*******************/
    function mediaTypeValidator(control: FormControl): { [s: string]: boolean } {  
      if (control.value <= 0 ) {  
        return {invalidMediaType: true};  
      }
    }
    function categoryValidator(control: FormControl): { [s: string]: boolean } {  
      if (control.value <= 0 ) {  
        return {invalidCategory: true};  
      }
    }

    this.replyForm = this._fb.group({
      // mediaTypeId: ['', <any>Validators.required],
      mediaTypeId: ['', Validators.compose([ Validators.required, mediaTypeValidator ])],
      mediaSourceId: ['', <any>Validators.required],
      // categoryId: ['', <any>Validators.required],
      categoryId: ['', Validators.compose([ Validators.required, categoryValidator ])],
      reporter: ['', [<any>Validators.required, <any>Validators.minLength(5)]]          
    });
    /* end - formGroup Stuff */ 

    this.neversubmitted = true;
    this.submitted = false;
  }

  /**************/
  /* On Selects */
  /**************/
  // onSelectType(_id: number): void {
  onSelectType(event): void {
    console.log('onSelectType event = ', event);
    // get fileter list of sources    
    // this.mediasources = this._rss.getMediaSourcesFiltered(_id);

    $('#mediasource').dropdown('clear');

    // this.mediasources = this._rss.getMediaSourcesFiltered(event);

    console.log('is event and array ', Array.isArray(event));

    if (event) {
      this.mediasources = this._rss.getMediaSourcesFiltered(event);
      console.log('onSelectType aft getMediaSourcesFiltered2 this.mediasources = ', this.mediasources);
    }
    

    // if a source was selected, clear it out
    if (this.ac_source!=null){
      this.ac_source=null;
    }

    // reset auto-complete source stuff
    this.acDisabled = false;
    this.ac_sources = this.mediasources
  } //onSelectType

  // onSelectSource(_ac_source: MediaSource): void {
  //   this.ac_source = _ac_source;

  //   console.log("onSelectSource", _ac_source);
  // }

  onSelectSource(event): void {
    // console.log('event =', event);
    // console.log("_selectedCategory", _id);
  }
  // onSelectCatergory(_id: number): void {
  onSelectCatergory(event): void {
    // console.log('event =', event);
    // console.log("_selectedCategory", _id);
  }

  // onSelectReply(mediaTypeId: number, mediaSourceId: number, categoryId: number, title: string): void {
  //   console.log('onSelectReply event =', mediaTypeId, mediaSourceId, categoryId, title);
  onSelectReply(_reply: Reply): void {
    console.log('onSelectReply event =', _reply);
    // console.log("_selectedCategory", _id);
    this._rss.selectedReply = _reply;
    this._rss.priorComponent = "list";

    this.submitted = true;
    this.setVisibleComponent.emit("create");    
  }

  /************************/
  /* PrimeNG AutoComplete */
  /************************/
  // filterSources(event) {
  //   let ac_found: boolean = false;
  //   this.ac_sources = this.mediasources
  //   this.ac_filteredSources = [];
    
  //   for(let i = 0; i < this.ac_sources.length; i++) {
  //       let ac_source = this.ac_sources[i];
  //       if(ac_source.mediaSourceName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
  //           this.ac_filteredSources.push(ac_source);

  //           ac_found = true;
  //           console.log("hit");
  //       }
  //   }

  //   if (!ac_found) {
  //     this.ac_sources = this.mediasources;
  //     this.ac_source = null;

  //     console.log("no hit");
  //   }
  // }
   
  // handleSourceDropdownClick() {
  //     this.ac_filteredSources = [];
      
  //     //mimic remote call
  //     setTimeout(() => {
  //         this.ac_filteredSources = this.mediasources;
  //     // }, 100)
  //     }, 1)
  //   }

  /***************/ 
  /* Submit Form */ 
  /***************/ 
  submitForm(model: any, isValid: boolean) {
      // console.log('model=', model);
      
      // model.mediaSourceId = this.ac_source.id;
      
      // check if model is valid
      // if valid, call API to save customer
      console.log("submitForm in list ", model, isValid);

      // this.postReply(model);
      console.log("in postReply in component");
      // this._dataService.postReply(model).subscribe(data => this.spreturns = data, 
      //                                             //  err => {this.errorMessage = <any>err; console.log("ERROR in postReply: "+ err);},
      //                                             //  err => console.log("ERROR in postReply: "+ err),
      //                                             err => console.log("ERROR in postReply: ", err),
      //                                             () => console.log ("postReply done", this.spreturns));
      

      
          this._ds.getReplies(model).subscribe(
                                      data => this.replies = data, 
                                      error => {this.errorMessage = <any>error, console.log('getReplies error', this.errorMessage);},
                                      () => console.log ("getReplies done", this.replies)
                                      );
      
      
      console.log("exiting postReply in component");

      this.submitted = true;

      // this.setVisibleComponent.emit("list");

    }

    buttonClick() {
      console.log("buttonClick");
      this.neversubmitted = false;
      this.submitted = false;
      console.log("neversubmitted = ", this.neversubmitted);
      }

}
