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
  mediasource: MediaSource = {id: 1, name: 'Television', mediaTypeId: 0};
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


     brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
    filteredBrands: any[];
    brand: string;
  // end PrimeNG AutoComplete

 
  constructor(private mediatypeService: MediaTypeService, private mediasourceService: MediaSourceService, private categoryService: CategoryService) {}
  mediasouresDS: MediaSource[] = [];

  
  //PrimeNG AutoComplete

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
        this.filteredBrands = [];
        
        //mimic remote call
        setTimeout(() => {
            this.ac_filteredSources = this.mediasources;
        }, 100)
    }


  filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }
    
    handleBrandDropdownClick() {
        this.filteredBrands = [];
        
        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
    }

  // ac_filterSources(event) {
  //       this.ac_filteredSources = [];
  //       for(let i = 0; i < this.mediasources.length; i++) {
  //           let mediasource = this.mediasources[i];
  //           if(mediasource.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
  //               this.ac_filteredSources.push(mediasource);
  //           }
  //       }
  //   }
    
    // handleDropdownClick() {
    //     this.ac_filteredSources = [];
        
    //     //mimic remote call
    //     setTimeout(() => {
    //         this.ac_filteredSources = this.ac_sources;
    //     }, 100)
    // }
    // end of PrimeNG Autocomplete
 
  
  /* internal gets */
  getMediaTypes(): void {
    this.mediatypeService.getMediaTypes().then(mediatypes => this.mediatypes = mediatypes);
  }
  // getMediaSourcesALL(): void {
  //   this.mediasourceService.getMediaSourcesALL().then(mediasources => this.mediasources = mediasources);
  // }

  getMediaSourcesFiltered(id: number): void {
    //var mediaList = null;
    this.mediasources = this.mediasourceService.getMediaSourcesALL().filter(mediasource => mediasource.mediaTypeId == id);
    // this.mediasourceService.getMediaSourcesALL().then(mediasources => this.mediasources = mediaList= mediasources.filter(mediasource => mediasource.mediaTypeId == id));
    //this.mediasources = mediaList;
    console.log(this.mediasources);
    
    //mediasouresDS = this.mediasourceService.getMediaSourcesALL().then(mediasources => this.mediasources = mediasources.filter(mediasource => mediasource.mediaTypeId == id));
  }

  getCategories(): void {
    this.categoryService.getCategories().then(categories => this.categories = categories);
  }
  /*****************/
    
  ngOnInit(): void {
    this.getMediaTypes();
    this.getCategories();

    console.log('mediatypes: ' + JSON.stringify(this.mediatypes));
  }

  onSelectType(_mediatype: MediaType): void {
    this.selectedMediaType = _mediatype;
    if (this.selectedMediaSource!=null){
      this.selectedMediaSource=null;
    }
    /*this.selectedMediaSource.id = 1;*/
    /*
    this.mediasource.id=0;
    this.mediasource.name="Please select a source for Eileen.";
    this.mediasource.mediaTypeId=this.selectedMediaType.id;
    this.mediasources.push(this.mediasource)
    */

    var _mediasource: MediaSource = {id: 1, name: 'PLEASE', mediaTypeId: _mediatype.id};
    this.mediasources.push(_mediasource)

    this.getMediaSourcesFiltered(this.selectedMediaType.id);
//this.mediasourceService.addMediaSource();
    
    //console.log(this.mediasources);

  
    console.log(this.mediasources);
    console.log('mediasources: ' + JSON.stringify(this.mediasources)) 


     this.acDisabled = false;
     this.ac_sources = this.mediasources
    
  }

  onSelectSource(_mediasource: MediaSource): void {
    this.selectedMediaSource = _mediasource;
  }


  onSelectCatergory(_category: Category): void {
    this.selectedCategory = _category;
  }

}
