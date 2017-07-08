import { Component, OnInit, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */

import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';  

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reporter } from '../../models/reporter';
import { Reply } from '../../models/reply';
import { SPReturn } from '../../models/spreturn';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'my-create',
  templateUrl: './replyCreate.component.html',
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
  reporters: Reporter[];

  /* Replies */
  reply: Reply;

  spreturn: SPReturn;
  spreturns: SPReturn[] = [];

  /* Model Form stuff */
  public replyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; 

  /* Miscellaneous */
  selectedMediaType: MediaType;
  selectedCategory: Category;

  selectedMediaTypeId: number = null;
  selectedMediaSourceId: number;
  selectedMediaSource: MediaSource = null; //!!!!REMOVE
  selectedCategoryId: number;
  selectedReporterId: number;

  maxDateValue: Date;
  initialDateValue: Date;

  thumbclass: string;

  otherReporter: boolean;
  otherMediaSource: boolean;
    
  neversubmitted: boolean;
  errorMessage: string;

  eventArray: number[]=[];

  constructor(private _rss: ReplySharedService, private _dataService: DataService, private _fb: FormBuilder, private cdr: ChangeDetectorRef) {}
  
  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.maxDateValue = new Date();

    this.reply = this._rss.reply;
    if (!this._rss.reply.articleDate) {
      this._rss.reply.articleDate = new Date();
    }
    
    /* initialize mediatypes */
    this.mediatypes = this._rss.mediatypes;
    this.selectedMediaTypeId = this._rss.reply.mediaTypeId;
   
    /* initialize mediasources */
    if (this.selectedMediaTypeId) {
      this.eventArray = [];
      this.eventArray.push(this.selectedMediaTypeId);
      // get filter list of sources
      this.mediasources = this._rss.getMediaSourcesFiltered(this.eventArray);
    }
    this.selectedMediaSourceId = this._rss.reply.mediaSourceId;

    this.otherMediaSource = false;
    if (this.selectedMediaSourceId == 0) {
      this.otherMediaSource = true;
    }

    /* initialize categories */
    this.categories = this._rss.categories;
    this.selectedCategoryId = this._rss.reply.categoryId;

    /* initialize reporters */
    this.reporters = this._rss.reporters;
    this.selectedReporterId = this._rss.reply.reporterId;
    this.otherReporter = false;
    if (this.selectedReporterId == 0) {
      this.otherReporter = true;
    }

    /* get article date in correct format for calendar */
    this._rss.reply.articleDate = new Date(this._rss.reply.articleDate);
    
    /* initialize thumbs up/down */
    this.thumbclass = '';
    if (this._rss.reply.articleThumbsUpDown == 0) {
      this.thumbclass = 'my-thumbs-neutral';
    }
    else if (this._rss.reply.articleThumbsUpDown == 1) {
      this.thumbclass = 'fa-thumbs-up';
    }
    else if (this._rss.reply.articleThumbsUpDown == -1) {
      this.thumbclass = 'fa-thumbs-down';
    }

    /*******************/
    /* formGroup Stuff */
    /*******************/
    /* articleDate validations */
    function articleDateValidator(control: FormControl): { [s: string]: boolean } {  
      var today = new Date();
      
      // article date cannot be past today
      if (control.value > today) {return {futureArticleDate: true};}

      return null;
    }

    /* otherMediaSource validations */
    function otherMediaSourceValidator(control: FormControl): { [s: string]: boolean } {
      let otherMediaSourceNameControl: FormControl;
      let mediaSourceIdControl: FormControl;

      if (!control.parent) {
        return null;
      }

      // Initializing the validator
      if (!otherMediaSourceNameControl) {
          otherMediaSourceNameControl = control;
          mediaSourceIdControl = control.parent.controls['mediaSourceId'] as FormControl;
          mediaSourceIdControl.valueChanges.subscribe(() => {
          otherMediaSourceNameControl.updateValueAndValidity();
        });
      }

      if (!mediaSourceIdControl) {
        return null;
      }
      
      if (mediaSourceIdControl.value == 0) {
        if (!otherMediaSourceNameControl.value) {
          return {noOtherMediaSource: true}
        }
        else if (otherMediaSourceNameControl.value == '') {
          return {noOtherMediaSource: true}
        }
        else if (otherMediaSourceNameControl.value.length <5) {
          return {tooshortOtherMediaSource: true}
        }
      }

      return null;
    }
       
    /* otherReporterName validations */
    function otherReporterValidator(control: FormControl): { [s: string]: boolean } {
      let otherReporterNameControl: FormControl;
      let reporterIdControl: FormControl;

      if (!control.parent) {
        return null;
      }

      // Initializing the validator
      if (!otherReporterNameControl) {
        otherReporterNameControl = control;
        reporterIdControl = control.parent.controls['reporterId'] as FormControl;
        //if report id changes, revalidate otherReporterName
        reporterIdControl.valueChanges.subscribe(() => {
          otherReporterNameControl.updateValueAndValidity();
        });
      }

      if (!reporterIdControl) {
        return null;
      }
      
      if (reporterIdControl.value == 0) {
        if (!otherReporterNameControl.value) {
          return {noOtherReporter: true}
        }
        else if (otherReporterNameControl.value == '') {
          return {noOtherReporter: true}
        }
        else if (otherReporterNameControl.value.length <5) {
          return {tooshortOtherReporter: true}
        }
      }

      return null;
    }
    
    this.replyForm = this._fb.group({
      mediaTypeId: [this._rss.reply.mediaTypeId, <any>Validators.required],
      mediaSourceId: [this._rss.reply.mediaSourceId, <any>Validators.required],
      otherMediaSourceName: [this._rss.reply.otherMediaSourceName, Validators.compose([ otherMediaSourceValidator ])],
      title: [this._rss.reply.title, [<any>Validators.required, <any>Validators.minLength(5)]],
      reporterId: [this._rss.reply.reporterId, <any>Validators.required],
      otherReporterName: [this._rss.reply.otherReporterName, Validators.compose([ otherReporterValidator ])],
      articleDate: [this._rss.reply.articleDate, Validators.compose([ Validators.required, articleDateValidator ])],
      articleURL: [this._rss.reply.articleURL],
      subscriberId: [this._rss.reply.subscriberId],

      categoryId: [this._rss.reply.categoryId, <any>Validators.required],
      subject: [this._rss.reply.subject, [<any>Validators.required, <any>Validators.minLength(5)]],
      replyText: [this._rss.reply.replyText, [<any>Validators.required, <any>Validators.minLength(5)]],
      articleThumbsUpDown: [this._rss.reply.articleThumbsUpDown],         
    });  

    this.neversubmitted = true;
  } //ngOnInit

  /*******************/
  /* After View Init */
  /*******************/
  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();

    $('#mediatype').dropdown('set selected', this._rss.reply.mediaTypeId);
    $('#mediasource').dropdown('set selected', this._rss.reply.mediaSourceId);
    $('#category').dropdown('set selected', this._rss.reply.categoryId);
    $('#reporter').dropdown('set selected', this._rss.reply.reporterId);

    this.cdr.detectChanges();

    // initialize all tooltips
    $(document).ready(function() {$('[data-toggle="tooltip"]').tooltip();});

    let _elementId: string = 'thumbs';
    document.getElementById(_elementId).classList.remove("fa-thumbs-up", "fa-thumbs-down", "my-thumbs-neutral");
    document.getElementById(_elementId).classList.add(this.thumbclass);
  }

  /**************/
  /* On Selects */
  /**************/
  onSelectType(event): void {
    this.selectedMediaTypeId = event;

    this.eventArray = [];
    this.eventArray.push(event);
    
    // get filter list of sources
    this.mediasources = this._rss.getMediaSourcesFiltered(this.eventArray);

    this._rss.reply.mediaSourceId = null;
    this.otherMediaSource = false;
    $('#mediasource').dropdown('clear');
  } //onSelectType

  onSelectSource(event): void {
    this.selectedMediaSourceId = event;

    if (this.selectedMediaSourceId && this.selectedMediaSourceId == 0) {this.otherMediaSource = true;}
    else {this.otherMediaSource = false;}
  } //onSelectSource

  onSelectCategory(event): void {
    this.selectedCategoryId = event;
  } //onSelectCategory

  onSelectReporter(event): void {
    this.selectedReporterId = event;
  
    if (this.selectedReporterId == 0) {this.otherReporter = true;}
    else {this.otherReporter = false;}
  } //onSelectReporter

  thumbsClick(_elementId: string) {
    let thumbclass: string = '';
    let thumbvalue: number = 0;
    if (this._rss.reply.articleThumbsUpDown == 0) {
      thumbclass = 'fa-thumbs-up';
      thumbvalue = 1;
    }
    else if (this._rss.reply.articleThumbsUpDown == 1) {
      thumbclass = 'fa-thumbs-down';
      thumbvalue = -1;
    }
    else if (this._rss.reply.articleThumbsUpDown == -1) {
      thumbclass = 'my-thumbs-neutral';
      thumbvalue = 0;
    }
    document.getElementById(_elementId).classList.remove("fa-thumbs-up", "fa-thumbs-down", "my-thumbs-neutral");
    document.getElementById(_elementId).classList.add(thumbclass);
    this._rss.reply.articleThumbsUpDown = thumbvalue;
  }
  
  /***************/ 
  /* Submit Form */ 
  /***************/ 
  submitForm(model: Reply, isValid: boolean) {
    model.articleThumbsUpDown = this._rss.reply.articleThumbsUpDown
    this._rss.reply = model;
    
    this.setVisibleComponent.emit("confirm");
  }

  buttonClick() {
    this.neversubmitted = false;     
  }

}
