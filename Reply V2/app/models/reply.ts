export class Reply {
  id: number;
  mediaTypeName: string;
  mediaTypeId: number;
  mediaSourceId: number;
  categoryId: number;
  title: string;
  reporter: string;
  // articleDate: date;
  replyText: string; //reply?
}

export const ReplyInitialize: Reply = 
    {
      "id": 0,
      "mediaTypeName": "",
      "mediaTypeId": 0,
      "mediaSourceId": 0,
      "categoryId": 0,
      "title": "",
      "reporter": "",
      // "articleDate": date;
      "replyText": "" //reply?
    }