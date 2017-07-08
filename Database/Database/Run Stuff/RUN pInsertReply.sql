declare @i_mediaTypeId tinyint = 1
declare @i_mediaSourceId int = 1
declare @i_otherMediaSourceName varchar(200) = null
declare @i_title varchar(500) = 'testing sp'
declare @i_reporterId int = 1
declare @i_otherReporterName varchar(200) = null
declare @i_articleDate date = getdate()
declare @i_articleURL varchar(500) = 'https://www.amazon.com/'
declare @i_subscriberId int = 1

declare @i_categoryId int = 1
declare @i_subject varchar(500) = 'testing subject'
declare @i_replyText varchar(4000) = 'testing the stored procedure'
declare @i_articleThumbsUpDown smallint = 1

exec pInsertReply	@i_mediaTypeId,
					@i_mediaSourceId,
					@i_otherMediaSourceName,
					@i_title,
					@i_reporterId,
					@i_otherReporterName,
					@i_articleDate,
					@i_articleURL,
					@i_subscriberId,

					@i_categoryId,
					@i_subject,
					@i_replyText,
					@i_articleThumbsUpDown


select * from article
select * from reply