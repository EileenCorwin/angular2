export class Reply {

  constructor(
    public mediaTypeId: number,
    public mediaSourceId: number,
    public categoryId: number,
    public title: string,
    // public articleDate: date,
    public replyText: string //reply?
	) {  }
}