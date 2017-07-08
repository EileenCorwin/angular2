export class Reply {
  mediaTypeId: number;
  mediaSourceId: number;
  otherMediaSourceName: string;
  title: string;
  reporterId: number;
  otherReporterName: string;
  articleDate: Date;
  articleURL: string;
  subscriberId: number;
  
  categoryId: number;
  subject: string;
  replyText: string;
  articleThumbsUpDown: number;
}

export const ReplyInitialize: Reply = 
    {
      "mediaTypeId": null,
      "mediaSourceId": null,
      "otherMediaSourceName": null,
      "title": null,
      "reporterId": null,
      "otherReporterName": null,
      "articleDate": null,
      "articleURL": null,
      "subscriberId": null,

      "categoryId": null,
      "subject": null,
      "replyText": null,
      "articleThumbsUpDown": 0
    }