import { Component, OnInit, OnDestroy, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */


import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';   

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reporter } from '../../models/reporter';
import { Replier } from '../../models/replier';
import { ListReply } from '../../models/list-reply';
import { ListSelection } from '../../models/list-selection';
import { ListSelectionInitialize } from '../../models/list-selection';
import { ListSelectionGet } from '../../models/list-selection-get';
import { ListSelectionGetInitialize } from '../../models/list-selection-get';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'my-list',
  templateUrl: './replyList.component.html',
  styleUrls: [ './replyList.component.css',  '../shared/replyShared.css'],
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
  reporters: Reporter[];
  repliers: Replier[];

  /* Replies */
  replies: ListReply[] = [];
  selections: ListSelection;
  selectionsGet: ListSelectionGet;
  
  /* Model Form stuff */
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = [];

  /* Miscellaneous */
  selectedMediaTypeId: number;
  selectedMediaSourceId: number;
  selectedMediaSource: MediaSource = null;
  selectedCategoryId: number;

  maxDateValue: Date;

  neversubmitted: boolean;
  errorMessage: string;
  daterangeinvalid: boolean;

  //??????
  selectedMediaType: MediaType;

  /* Model Form stuff */
  public selectionForm: FormGroup; // our model driven form

  eventArray: number[]=[];

  constructor(private _rss: ReplySharedService, private _ds: DataService, private _fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.selections = this._rss.selections;

    /* initialize mediatypes */
    this.mediatypes = this._rss.mediatypes;
    
    /* initialize mediasources */
    if (this.selections.mediaTypeId) {
      this.eventArray = this.selections.mediaTypeId;
      this.mediasources = this._rss.getMediaSourcesFiltered(this.eventArray);
    }
    
    /* initialize categories */
    this.categories = this._rss.categories;

    /* initialize reporters */
    this.reporters = this._rss.getReportersIncludingOthers();
    
    /* initialize repliers */
    this.repliers = this._rss.repliers;
    
    this.maxDateValue = new Date();
    if (!this.selections.articleDateFrom) {
      this.selections.articleDateFrom = new Date();
    }
    if (!this.selections.articleDateTo) {
      this.selections.articleDateTo = new Date();
    }

    /*******************/
    /* formGroup Stuff */
    /*******************/
    this.selectionForm = this._fb.group({
      mediaTypeId: [this._rss.selections.mediaTypeId],
      mediaSourceId: [this._rss.selections.mediaSourceId],
      reporterId: [this._rss.selections.reporterId],
      title: [this._rss.selections.title],
      articleDateFrom: [this._rss.selections.articleDateFrom, <any>Validators.required],
      articleDateTo: [this._rss.selections.articleDateTo, Validators.compose([ Validators.required, articleDateValidator ])],
      
      categoryId: [this._rss.selections.categoryId],
      replierId: [this._rss.selections.replierId],
      subject: [this._rss.selections.subject]         
    })
    
    
    /* articleDate validations */
    function articleDateValidator(control: FormControl): { [s: string]: boolean } {  
      if (!control.parent) {
        return null;
      }

      let articleDateFromContol: FormControl;
      let articleDateToContol: FormControl;

      // Initializing the validator
      if (!articleDateToContol) {
        articleDateToContol = control;
        articleDateFromContol = control.parent.controls['articleDateFrom'] as FormControl;
        //if from date changes, revalidate to date
        articleDateFromContol.valueChanges.subscribe(() => {
          articleDateToContol.updateValueAndValidity();
        });
      }

      if (articleDateToContol.value < articleDateFromContol.value) {
        return {articleDateRangeInvalid: true}
      }
  
      return null;
    }
    /* end - formGroup Stuff */ 

    this.neversubmitted = true;
    this.submitted = false;
    this.daterangeinvalid = false;
  } //ngOnInit

  /*******************/
  /* After View Init */
  /*******************/
  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();

    $('#mediatype').dropdown();
    $('#mediasource').dropdown();
    $('#cateogry').dropdown();
    $('#reporter').dropdown();
    $('#replier').dropdown();

    $('#mediatype').dropdown('set selected', this.selections.mediaTypeId);
    $('#mediasource').dropdown('set selected', this.selections.mediaSourceId);
    $('#cateogry').dropdown('set selected', this.selections.categoryId);

    $('#reporter').dropdown('set selected', this.selections.reporterId);
    $('#replier').dropdown('set selected', this.selections.replierId);

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._rss.selections.mediaTypeId = this.selectionForm.controls.mediaTypeId.value;
    this._rss.selections.mediaSourceId = this.selectionForm.controls.mediaSourceId.value;
    this._rss.selections.reporterId = this.selectionForm.controls.reporterId.value;
    this._rss.selections.title = this.selectionForm.controls.title.value;
    this._rss.selections.articleDateFrom = this.selectionForm.controls.articleDateFrom.value;
    this._rss.selections.articleDateTo = this.selectionForm.controls.articleDateTo.value;
    this._rss.selections.categoryId = this.selectionForm.controls.categoryId.value;
    this._rss.selections.replierId = this.selectionForm.controls.replierId.value;
    this._rss.selections.subject = this.selectionForm.controls.subject.value;
  }

  /**************/
  /* On Selects */
  /**************/
  onSelectType(event): void {
    $('#mediasource').dropdown('clear');

    if (event) {
      this.mediasources = this._rss.getMediaSourcesFiltered(event);
    }
  } //onSelectType

  onSelectSource(event): void {}

  onSelectCatergory(event): void {}

  onSelectReporter(event): void {}

  onSelectReplier(event): void {}

  onSelectReply(event) {
    this._ds.getReplyById(event).subscribe(
                                  data => this._rss.reply = data,  
                                  error => {this.errorMessage = <any>error, console.log('getReporters error', this.errorMessage);},
                                  () => {
                                         this._rss.reply.replyText = '';
                                         this._rss.currentComponent = "create";
                                         this._rss.changeMenuColors();
                                         this.submitted = true;
                                         this.setVisibleComponent.emit("create");
                                        }
                                  );
  }

  /***************/ 
  /* Submit Form */ 
  /***************/ 
  submitForm(model: ListSelection, isValid: boolean) {
    /* initialize Get selections */
    this.selectionsGet = ListSelectionGetInitialize;
    this.selectionsGet.mediaTypeId = model.mediaTypeId;
    this.selectionsGet.mediaSourceId = model.mediaSourceId;
    this.selectionsGet.reporterId = model.reporterId;
    this.selectionsGet.title = model.title;
    this.selectionsGet.articleDateFrom = model.articleDateFrom;
    this.selectionsGet.articleDateTo = model.articleDateTo;
    this.selectionsGet.categoryId = model.categoryId;
    this.selectionsGet.replierId = model.replierId;
    this.selectionsGet.subject = model.subject;

    this._rss.selections = model;

    /********************************/
    /* Populate other media sources */
    this.selectionsGet.otherMediaSourceId = [];
    for (var i=0; i < this.selectionsGet.mediaSourceId.length; i++) {
      var id = this.selectionsGet.mediaSourceId[i];
      if (id < 0) {
        this.selectionsGet.otherMediaSourceId.push(id);
      }      
    }

    /****************************/
    /* Populate other reporters */
    this.selectionsGet.otherReporterId = [];
    for (var i=0; i < this.selectionsGet.reporterId.length; i++) {
      var id = this.selectionsGet.reporterId[i];
      if (id < 0) {
        this.selectionsGet.otherReporterId.push(id);
      }      
    }

    this._ds.getReplies(this.selectionsGet).subscribe(
                            data => this.replies = data, 
                            error => {this.errorMessage = <any>error, console.log('getReplies error', this.errorMessage);},
                            () => console.log ("getReplies done", this.replies)
                            );

    this.submitted = true;
  
  }

  buttonClick() {
    this.neversubmitted = false;
  }

}
