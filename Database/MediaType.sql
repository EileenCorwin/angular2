if exists(select name from sysobjects where name = 'MediaType')
drop table [dbo].[MediaType]
go

CREATE TABLE [dbo].[MediaType]
(
	[id] INT IDENTITY(1,1) NOT NULL, 
    [mediaTypeName] VARCHAR(100) NOT NULL,
	[sortSeq] integer,
    CONSTRAINT [PK_MediaType_id] PRIMARY KEY CLUSTERED (id)
)
go