import { Injectable } from '@angular/core';

import { MediaType } from '../objects/media-type';

import { MediaSource } from '../objects/media-source';
import { MEDIASOURCES } from '../mock-data/mock-media-sources';

@Injectable()
export class MediaSourceService {
	
  getMediaSourcesALL(): MediaSource[] {
    return MEDIASOURCES;
  }


  //   getMediaSourcesALL(): Promise<MediaSource[]> {
  //   return Promise.resolve(MEDIASOURCES);
  // } 

addMediaSource() :void{
  //MEDIASOURCES.push()
  var _mediasource: MediaSource = {id: 1, name: 'Television', mediaTypeId: 2};
    MEDIASOURCES.push(_mediasource)

}


  /*
  getMediaSources(id: number): Promise<MediaSource[]> {
    return this.getMediaSources()
               .then(mediasources => mediasources.find(mediasource => mediasource.mediatypeid === id));
  }
  */

}
