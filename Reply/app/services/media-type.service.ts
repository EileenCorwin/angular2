import { Injectable } from '@angular/core';

import { MediaType } from '../objects/media-type';
import { MEDIATYPES } from '../mock-data/mock-media-types';

@Injectable()
export class MediaTypeService {
	
  getMediaTypes(): Promise<MediaType[]> {
    return Promise.resolve(MEDIATYPES);
  }
}
