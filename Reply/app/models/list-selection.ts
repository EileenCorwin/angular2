export class ListSelection {
  mediaTypeId: number[];
  mediaSourceId: number[];
  reporterId: number[];
  title: string;
  articleDateFrom: Date;
  articleDateTo: Date;
  
  categoryId: number[];
  replierId: number[];
  subject: string;
}

export const ListSelectionInitialize: ListSelection = 
    {
      "mediaTypeId": [],
      "mediaSourceId": [],
      "reporterId": [],
      "title": '',
      "articleDateFrom": null,
      "articleDateTo": null,

      "categoryId": [],
      "replierId": [],
      "subject": ''
    }