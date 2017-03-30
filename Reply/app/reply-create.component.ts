import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */

//Models and Services
import { MediaType } from './models/media-type';
import { MediaSource } from './models/media-source';
import { Category } from './models/category';
import { Reply } from './models/reply';
import { DataService } from './services/data.service';  

@Component({
  moduleId: module.id,
  selector: 'my-reply-create',
  templateUrl: './reply-create.component.html',
  styleUrls: [ './reply-create.component.css' ],
  providers: [DataService]
})

export class ReplyCreateComponent implements OnInit { 
  /* Media Types */
  mediatype: MediaType;
  mediatypes: MediaType[];
  selectedMediaType: MediaType;
  
 /* Media Sources */
  mediasource: MediaSource;
  mediasources: MediaSource[]=[];
  selectedMediaSource: MediaSource;    
  
 /* Cateogries */
  category: Category;
  categories: Category[]=[];
  selectedCategory: Category;

  /* Replies */
  reply: Reply;
  replies: Reply[] = [];

  /* Model Form stuff */
  public replyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  
  /* PrimeNG variables */
  ac_source: MediaSource;
  ac_sources: MediaSource[]=[];
  ac_filteredSources: any[];
  acDisabled: boolean = true;

  /* Miscellanesou */
  neversubmitted: boolean;
  errorMessage: string;

  constructor(private _dataService: DataService, private _fb: FormBuilder) {}
  
  /******************************/
  /* Internal GETs, PUTs, POSTs */
  /******************************/
  getMediaTypes(): void {
    console.log("in getMediaTypes in component");
    
    this._dataService.getMediaTypes().subscribe(mediatypes => this.mediatypes = mediatypes, error => this.errorMessage = <any>error);

    console.log("exiting getMediaTypes in component");
  }

  getMediaSourcesFiltered(mediaTypeId: number): void {
    console.log("in getMediaSourcesFiltered in component");
    
    this._dataService.getMediaSourcesFiltered(mediaTypeId).subscribe(mediasources => this.mediasources = mediasources, error => this.errorMessage = <any>error);

    console.log("exiting getMediaSourcesFiltered in component");
  }

  getCategories(): void {
    console.log("in getCategories in component");
    
    this._dataService.getCategories().subscribe(categories => this.categories = categories, error => this.errorMessage = <any>error);

    console.log("exiting getCategories in component");
  }
  
  getReplies(): void {
    console.log("in getReplies in component");
    
    this._dataService.getReplies().subscribe(replies => this.replies = replies, error => this.errorMessage = <any>error);

    console.log("exiting getReplies in component");
  }
  
  /***********/
  /* On Init */
  /***********/
  ngOnInit(): void {
    this.getMediaTypes(); 
    this.getCategories();

    this.getReplies();
 
    this.replyForm = this._fb.group({
        mediaTypeId: ['', <any>Validators.required],
        mediaSourceId: ['', <any>Validators.required],
        // mediaSourceId: [{value: '', disabled: true}, <any>Validators.required],
        categoryId: ['', <any>Validators.required],
        title: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        reporter: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        // articleDate: date,
        replyText: ['', [<any>Validators.required, <any>Validators.minLength(5)]]          
    }); 

    this.neversubmitted = true;
  }

  /**************/
  /* On Selects */
  /**************/
  onSelectType(_mediatype: MediaType): void {
    this.selectedMediaType = _mediatype;
    if (this.selectedMediaSource!=null){
      this.selectedMediaSource=null;
    }

    this.getMediaSourcesFiltered(this.selectedMediaType.id);
console.log("sources: ", this.mediasources);

    this.acDisabled = false;
    this.ac_sources = this.mediasources
  }

  onSelectSource(_ac_source: MediaSource): void {
    this.ac_source = _ac_source;
    
    console.log("onSelectSource");
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
      }, 100)
    }

  /***************/ 
  /* Submit Form */ 
  /***************/ 
  submitForm(model: Reply, isValid: boolean) {
        // this.submitted = true; // set form submit to true

        model.mediaSourceId = this.ac_source.id;

        // check if model is valid
        // if valid, call API to save customer
        console.log("save ", model, isValid);

    }

    buttonClick() {
      console.log("buttonClick");
      this.neversubmitted = false;
      console.log("neversubmitted = ", this.neversubmitted);
      }
}
