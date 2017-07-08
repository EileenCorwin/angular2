// Angular
import { Injectable } from '@angular/core';

// RxJs
import { Observable } from 'rxjs/Observable';

// App models
import { MediaType } from '../models/media-type';
import { MediaSource } from '../models/media-source';
import { Category } from '../models/category';
import { Reporter } from '../models/reporter';
import { Replier } from '../models/replier';
import { Reply } from '../models/reply';
import { ListSelection } from '../models/list-selection';

// App services
import { DataService } from '../services/data.service';


@Injectable()
export class ReplySharedService {
  /* Lookup objects */
  mediatypes: MediaType[];
  mediasources: MediaSource[];
  othermediasources: MediaSource[];
  categories: Category[];
  reporters: Reporter[];
  otherreporters: Reporter[];
  repliers: Replier[];

  /* Create objects passed between create and confirm */
  reply: Reply;
  selections: ListSelection;

  // selectedReply: Reply = null;
  priorComponent: string = "";
  currentComponent: string = "";

  loggedinSubscriberId: number = 1; //!!TEMP

  /* Miscellnaeous */
  errorMessage: string;

  filteredmediasources: MediaSource[] = null;
  allreporters: Reporter[] = null;

  selectedColor: string = "white";
  notselectedColor: string = "#cccccc";
  
  constructor(private _ds: DataService) {}

  retrieveAllLookupData(): void {
    this._ds.getMediaTypes().subscribe(
                                      data => this.mediatypes = data, 
                                      error => {this.errorMessage = <any>error, console.log('getMediaTypes error', this.errorMessage);},
                                      () => console.log ("getMediaTypes in ReplySharedService done", this.mediatypes)
                                      );
    this._ds.getMediaSources().subscribe(
                                      data => this.mediasources = data, 
                                      error => {this.errorMessage = <any>error, console.log('getMediaSources error', this.errorMessage);},
                                      () => console.log ("getMediaSources in ReplySharedService done", this.mediasources)
                                      );
    this._ds.getOtherMediaSources().subscribe(
                                      data => this.othermediasources = data, 
                                      error => {this.errorMessage = <any>error, console.log('getOtherMediaSources error', this.errorMessage);},
                                      () => console.log ("getOtherMediaSources in ReplySharedService done", this.othermediasources)
                                      );
    this._ds.getCategories().subscribe(
                                      data => this.categories = data, 
                                      error => {this.errorMessage = <any>error, console.log('getCategories error', this.errorMessage);},
                                      () => console.log ("getCategories in ReplySharedService done", this.categories)
                                      );
    this._ds.getReporters().subscribe(
                                      data => this.reporters = data, 
                                      error => {this.errorMessage = <any>error, console.log('getReporters error', this.errorMessage);},
                                      () => console.log ("getReporters in ReplySharedService done", this.reporters)
                                      );

    this._ds.getOtherReporters().subscribe(
                                      data => this.otherreporters = data, 
                                      error => {this.errorMessage = <any>error, console.log('getOtherReporters error', this.errorMessage);},
                                      () => console.log ("getOtherReporters in ReplySharedService done", this.reporters)
                                      );

    this._ds.getRepliers().subscribe(
                                      data => this.repliers = data, 
                                      error => {this.errorMessage = <any>error, console.log('getRepliers error', this.errorMessage);},
                                      () => console.log ("getRepliers in ReplySharedService done", this.repliers)
                                      );

  }

  getMediaSourcesFiltered(_mediaTypeIds: number[]) {
    this.filteredmediasources = [];
  
    for (var i=0; i < _mediaTypeIds.length; i++) {
      var filtered = this.mediasources.filter(mediasource => mediasource.mediaTypeId == _mediaTypeIds[i]);
      
      this.filteredmediasources = this.filteredmediasources.concat(filtered);
      
      //for List component - add the "other" media sources to the list
      if (this.currentComponent === 'list') {
        filtered = this.othermediasources.filter(othermediasource => othermediasource.mediaTypeId == _mediaTypeIds[i]);
        console.log("filtered othermediasources = ", filtered);
        this.filteredmediasources = this.filteredmediasources.concat(filtered); 
      }
    }

    //for Create component - add OTHER to the list
    if (this.currentComponent === 'create') {
      filtered = this.mediasources.filter(mediasource => mediasource.mediaTypeId == 0);
      this.filteredmediasources = this.filteredmediasources.concat(filtered); 
    }
    
    return this.filteredmediasources;

  }

  getReportersIncludingOthers() {
    this.allreporters = [];
    this.allreporters = this.reporters.filter(reporter => reporter.id != 0);
    console.log("otherreporters = ", this.otherreporters);
    this.allreporters = this.allreporters.concat(this.otherreporters);
    return this.allreporters;
  }
  
  getReply() {
    return this.reply;
  }

  changeMenuColors() {
    let elementId: string = "a-" + this.currentComponent;
    document.getElementById(elementId).style.color = this.selectedColor;

    if (elementId != "a-main") {document.getElementById("a-main").style.color = this.notselectedColor;}
    if (elementId != "a-list") {document.getElementById("a-list").style.color = this.notselectedColor;}
    if (elementId != "a-create") {document.getElementById("a-create").style.color = this.notselectedColor;}

  }

}
