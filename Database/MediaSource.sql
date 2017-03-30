if exists(select name from sysobjects where name = 'MediaSource')
drop table [dbo].[MediaSource]
go

CREATE TABLE [dbo].[MediaSource]
(
	[id] INT IDENTITY(1,1) NOT NULL, 
    [mediaSourceName] VARCHAR(100) NOT NULL,
	[mediaTypeId] integer NOT NULL,
	[sortSeq] integer, 
    CONSTRAINT [PK_MediaSource_id] PRIMARY KEY CLUSTERED (id),
	CONSTRAINT [FK_MediaSource_mediaTypeId] FOREIGN KEY (mediaTypeId) REFERENCES MediaType(id)
)
go