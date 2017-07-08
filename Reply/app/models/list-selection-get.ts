export class ListSelectionGet {
  mediaTypeId: number[];
  mediaSourceId: number[];
  otherMediaSourceId: number[];
  reporterId: number[];
  otherReporterId: number[];
  title: string;
  articleDateFrom: Date;
  articleDateTo: Date;
  
  categoryId: number[];
  replierId: number[];
  subject: string;
}

export const ListSelectionGetInitialize: ListSelectionGet = 
    {
      "mediaTypeId": [],
      "mediaSourceId": [],
      "otherMediaSourceId": [],
      "reporterId": [],
      "otherReporterId": [],
      "title": '',
      "articleDateFrom": null,
      "articleDateTo": null,

      "categoryId": [],
      "replierId": [],
      "subject": ''
    }