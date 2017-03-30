if exists(select name from sysobjects where name = 'Reply')
drop table [dbo].[Reply]
go

CREATE TABLE [dbo].[Reply]
(
	[id] INT IDENTITY(1,1) NOT NULL,
	[mediaTypeId] integer NOT NULL, 
	[mediaSourceId] integer NOT NULL,
	[categoryId] integer NOT NULL,
    [title] VARCHAR(200) NOT NULL,
	[reporter] VARCHAR(100) NOT NULL,
	--[articleDate] DATE NOT NULL,
	[replyText] VARCHAR(1000) NOT NULL,
    CONSTRAINT [PK_Reply_id] PRIMARY KEY CLUSTERED (id),
    --CONSTRAINT [CK_profileName] unique (profileName),
	CONSTRAINT [FK_Reply_mediaTypeId] FOREIGN KEY (mediaTypeId) REFERENCES MediaType(id),
	CONSTRAINT [FK_Reply_mediaSourceId] FOREIGN KEY (mediaSourceId) REFERENCES MediaSource(id),
	CONSTRAINT [FK_Reply_categoryId] FOREIGN KEY (categoryId) REFERENCES Category(id)
)
go