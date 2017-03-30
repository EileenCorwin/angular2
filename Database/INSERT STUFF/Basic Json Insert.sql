SET QUOTED_IDENTIFIER OFF
SET ANSI_NULLS ON 

DECLARE @json NVARCHAR(max)
SET @json = N'{ "mediaTypeId": 1, "mediaSourceId": 2, "categoryId": 4, "title": "title 124", "reporter": "eileen", "replyText": "reply 124" }'
  select @json


--Get the table With values
DECLARE @With varchar (4000) = ''
SELECT	@With = (@With
				+ COLUMN_NAME + ' ' + 
				case when DATA_TYPE = 'int' then DATA_TYPE
					  when DATA_TYPE = 'varchar' then DATA_TYPE + '(' + cast(CHARACTER_MAXIMUM_LENGTH as varchar(10)) + ')'
					  else DATA_TYPE end
				+ ', ')
FROM	INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Reply' and COLUMN_NAME <> 'id'
SET @With = left(@With, Len(@With)-1)

--Get the table With values
DECLARE @Select varchar (4000) = ''
SELECT	@Select = (@Select
				+ COLUMN_NAME
				+ ', ')
FROM	INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Reply' and COLUMN_NAME <> 'id'
SET @Select = left(@Select, Len(@Select)-1) 

select @Select

DECLARE @SQL varchar(1000) = '';
SET @SQL = 'insert into Reply'
			+ ' select ' + @Select
			+ ' from OPENJSON (''' + @json + ''')'
			+ ' with (' + @With + ')'

select @SQL

exec(@SQL)

	--insert into Reply
	--select mediaTypeId, mediaSourceId, categoryId, title, reporter, replyText
	--from OPENJSON(@json)
	--with (mediaTypeId int,
	--	mediaSourceId int,
	--	categoryId int,
	--	title varchar(200),
	--	reporter varchar(100),
	--	replyText varchar(1000))