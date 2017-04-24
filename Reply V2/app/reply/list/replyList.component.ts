import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */


import { ReplySharedService } from '../../services/replyShared.service';
import { DataService } from '../../services/data.service';   

// App models
import { MediaType } from '../../models/media-type';
import { MediaSource } from '../../models/media-source';
import { Category } from '../../models/category';
import { Reply } from '../../models/reply';
import { ReplyDisplay } from '../../models/reply-display';


@Component({
  moduleId: module.id,
  selector: 'my-list',
  templateUrl: './replyList.component.html',
  styleUrls: [ './replyList.component.css',  '../shared/sidenav.css',  '../shared/replyShared.css'],
  providers: [DataService]
})

export class ReplyListComponent implements OnInit {
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
  selectedMediaSource: MediaSource = null;
  selectedCategoryId: number;

  neversubmitted: boolean;
  errorMessage: string;

  constructor(private _rss: ReplySharedService, private _ds: DataService, private _fb: FormBuilder) {}

  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.mediatypes = this._rss.getMediaTypes();
    console.log('in constructor replyCreate aft  in ngOnInit>= ', this.mediatypes);
    
    this.categories = this._rss.getCategories();
    console.log('in constructor replyCreate aft  in ngOnInit>= ', this.categories);

    this.replyForm = this._fb.group({
      mediaTypeId: ['', <any>Validators.required],
      mediaSourceId: ['', <any>Validators.required],
      categoryId: ['', <any>Validators.required],
      reporter: ['', [<any>Validators.required, <any>Validators.minLength(5)]]          
    }); 

    this.neversubmitted = true;
    this.submitted = false;
  }

  /**************/
  /* On Selects */
  /**************/
  onSelectType(_id: number): void {
    // get fileter list of sources    
    this.mediasources = this._rss.getMediaSourcesFiltered(_id);

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

    console.log("onSelectSource", _ac_source);
  }

  onSelectCatergory(_id: number): void {
    
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
  submitForm(model: any, isValid: boolean) {
      // console.log('model=', model);
      
      model.mediaSourceId = this.ac_source.id;
      
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
