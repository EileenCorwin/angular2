import { Component, OnInit } from '@angular/core';


import { MediaType } from './objects/media-type';
import { MediaTypeService } from './services/media-type.service'; 

import { MediaSource } from './objects/media-source';
import { MediaSourceService } from './services/media-source.service'; 

import { Category } from './objects/category';
import { CategoryService } from './services/category.service'; 

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

  
  /* PrimeNG variables */
  ac_source: MediaSource;
  ac_sources: MediaSource[]=[];
  ac_filteredSources: any[];
  acDisabled: boolean = true;


  constructor(private mediatypeService: MediaTypeService, private mediasourceService: MediaSourceService, private categoryService: CategoryService) {}
  
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

  onSelectSource(_mediasource: MediaSource): void {
    this.selectedMediaSource = _mediasource;
    }

  onSelectCatergory(_category: Category): void {
    this.selectedCategory = _category;
    }

  /* PrimeNG AutoComplete */
  filterSources(event) {
    this.ac_sources = this.mediasources
    this.ac_filteredSources = [];
    for(let i = 0; i < this.ac_sources.length; i++) {
        let ac_source = this.ac_sources[i];
        if(ac_source.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.ac_filteredSources.push(ac_source);
        }
      }
    }
   
  handleSourceDropdownClick() {
      this.ac_filteredSources = [];
      
      //mimic remote call
      setTimeout(() => {
          this.ac_filteredSources = this.mediasources;
      }, 100)
    }
}
