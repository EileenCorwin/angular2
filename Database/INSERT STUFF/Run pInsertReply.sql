DECLARE @json NVARCHAR(max)
SET @json = N'{ "mediaTypeId": 2, "mediaSourceId": 2, "categoryId": 4, "title": "title 224", "reporter": "eileen", "replyText": "reply 224" }'
  select @json


  exec pInsertReply @json