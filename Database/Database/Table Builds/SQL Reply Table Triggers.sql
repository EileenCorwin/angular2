USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- *********
-- MediaType
-- *********
CREATE TRIGGER 	trgAfterUpdate_MediaType
ON 				MediaType
AFTER UPDATE 
AS

		UPDATE	MediaType
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	MediaType.id = i.id
		
go

-- ***********
-- MediaSource
-- ***********
CREATE TRIGGER 	trgAfterUpdate_MediaSource
ON 				MediaSource
AFTER UPDATE 
AS

		UPDATE	MediaSource
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	MediaSource.id = i.id
		
go

-- ********
-- Category
-- ********
CREATE TRIGGER 	trgAfterUpdate_Category
ON 				Category
AFTER UPDATE 
AS

		UPDATE	Category
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	Category.id = i.id
		
go

-- ********
-- Reporter
-- ********
CREATE TRIGGER 	trgAfterUpdate_Reporter
ON 				Reporter
AFTER UPDATE 
AS

		UPDATE	Reporter
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	Reporter.id = i.id
		
go

-- **********
-- Subscriber
-- **********
CREATE TRIGGER 	trgAfterUpdate_Subscriber
ON 				Subscriber
AFTER UPDATE 
AS

		UPDATE	Subscriber
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	Subscriber.id = i.id
		
go

-- *******
-- Article
-- *******
CREATE TRIGGER 	trgAfterUpdate_Article
ON 				Article
AFTER UPDATE 
AS

		UPDATE	Article
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	Article.id = i.id
		
go

-- *****
-- Reply
-- *****
CREATE TRIGGER 	trgAfterUpdate_Reply
ON 				Reply
AFTER UPDATE 
AS

		UPDATE	Reply
		SET		updateDate = GETDATE()
		FROM	Inserted i
		WHERE	Reply.id = i.id
		
go


