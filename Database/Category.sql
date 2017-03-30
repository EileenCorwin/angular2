if exists(select name from sysobjects where name = 'Category')
drop table [dbo].[Category]
go

CREATE TABLE [dbo].[Category]
(
	[id] INT IDENTITY(1,1) NOT NULL, 
    [categoryName] VARCHAR(100) NOT NULL,
	[sortSeq] integer, 
    CONSTRAINT [PK_Category_id] PRIMARY KEY CLUSTERED (id)
)
go