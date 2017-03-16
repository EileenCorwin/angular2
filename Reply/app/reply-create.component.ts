import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; /* for model form */


import { MediaType } from './objects/media-type';
import { MediaTypeService } from './services/media-type.service'; 

import { MediaSource } from './objects/media-source';
import { MediaSourceService } from './services/media-source.service'; 

import { Category } from './objects/category';
import { CategoryService } from './services/category.service'; 

// import { Reply } from './objects/reply'; -- was for template form

/* My Interfaces */
import { Reply } from './interfaces/IReply.interface';


@Component({
  moduleId: module.id,
  selector: 'my-reply-create',
  templateUrl: './reply-create.component.html',
  styleUrls: [ './reply-create.component.css' ],
  providers: [MediaTypeService, MediaSourceService, CategoryService]
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
  categories: Category[];
  selectedCategory: Category;

  /* Reply */
   /* for template form
   reply: Reply;
   model = new Reply(null, null, 0, null, null, null);
   */

  /* Model Form stuff */
  public replyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
 
  
  /* PrimeNG variables */
  ac_source: MediaSource;
  ac_sources: MediaSource[]=[];
  ac_filteredSources: any[];
  acDisabled: boolean = true;

  neversubmitted: boolean;


  // constructor(private mediatypeService: MediaTypeService, private mediasourceService: MediaSourceService, private categoryService: CategoryService) {}
  constructor(private mediatypeService: MediaTypeService, private mediasourceService: MediaSourceService, private categoryService: CategoryService,
              private _fb: FormBuilder) {}
  
  /* for template form
  submitted=false;
  onSubmit() {this.submitted = true;
  } 
console.log(this.model); 
*/

  

  /* internal gets */
  getMediaTypes(): void {
    this.mediatypeService.getMediaTypes().then(mediatypes => this.mediatypes = mediatypes);
  }

  getMediaSourcesFiltered(mediaTypeId: number): void {
    this.mediasourceService.getMediaSourcesFiltered(mediaTypeId).then(mediasources => this.mediasources = mediasources)
    }
  
  //old way of getting all and then filtering the return set
  // getMediaSourcesFilteredALLFILTER(id: number): void {
  //   // this.mediasources = this.mediasourceService.getMediaSourcesALL().filter(mediasource => mediasource.mediaTypeId == id); //B4 Promise
  //   this.mediasourceService.getMediaSourcesALL().then(mediasources => this.mediasources = mediasources.filter(mediasource => mediasource.mediaTypeId == id));
  //   }

  getCategories(): void {
    this.categoryService.getCategories().then(categories => this.categories = categories);
  }

  
  /* On Init */
  ngOnInit(): void {
    this.getMediaTypes();
    this.getCategories();

    this.replyForm = this._fb.group({
        mediaTypeId: ['', <any>Validators.required],
        mediaSourceId: ['', <any>Validators.required],
        categoryId: ['', <any>Validators.required],
        title: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        reporter: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        // articleDate: date,
        replyText: ['', [<any>Validators.required, <any>Validators.minLength(5)]]          
      }); 

      this.neversubmitted = true;   
  }

  /* On Selects */
  onSelectType(_mediatype: MediaType): void {
    this.selectedMediaType = _mediatype;
    if (this.selectedMediaSource!=null){
      this.selectedMediaSource=null;
      }
 
    this.getMediaSourcesFiltered(this.selectedMediaType.id);
    // this.mediasourceService.getMediaSourcesFiltered(this.selectedMediaType.id).then(mediasources => this.mediasources = mediasources);

    
    this.acDisabled = false;
    this.ac_sources = this.mediasources
    }

//   onSelectSource(_mediasource: MediaSource): void {
//     this.selectedMediaSource = _mediasource;
// console.log("onSelectSource");
// console.log(this.selectedMediaSource);
// // this.model.mediaSourceId = this.selectedMediaSource.id
//     }

  onSelectSource(_ac_source: MediaSource): void {
    this.ac_source = _ac_source;
    // this.model.mediaSourceId = this.ac_source.id -- used with template form
    
console.log("onSelectSource");
// console.log(this.model.mediaSourceId);
// this.model.mediaSourceId = this.selectedMediaSource.id
    }


  onSelectCatergory(_category: Category): void {
    this.selectedCategory = _category;
    }

  /* PrimeNG AutoComplete */
  filterSources(event) {
    let ac_found: boolean = false;
    this.ac_sources = this.mediasources
    this.ac_filteredSources = [];
    
    for(let i = 0; i < this.ac_sources.length; i++) {
        let ac_source = this.ac_sources[i];
        if(ac_source.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
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
  
  submitForm(model: Reply, isValid: boolean) {
        this.submitted = true; // set form submit to true

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
