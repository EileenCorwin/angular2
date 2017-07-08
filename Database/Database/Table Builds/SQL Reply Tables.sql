USE Reply
go

-- *********
-- MediaType
-- *********
if exists(select name from sysobjects where name = 'MediaType')
drop table MediaType
go

CREATE TABLE MediaType
(
	id 				tinyint 		IDENTITY,
    mediaTypeName 	varchar(100) 	NOT NULL,
	sortSeq 		tinyint				NULL,
	active			bit				NOT NULL	DEFAULT 1,
	createUser		varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	createDate		datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser		varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate		datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_MediaType_id PRIMARY KEY NONCLUSTERED (id)
)
go

-- ***********
-- MediaSource
-- ***********
if exists(select name from sysobjects where name = 'MediaSource')
drop table MediaSource
go

CREATE TABLE MediaSource
(
	id 					int 			IDENTITY, 
    mediaSourceName 	varchar(100) 	NOT NULL,
	mediaTypeId 		tinyint			NOT NULL,
	sortSeq 			int					NULL,
	active				bit				NOT NULL	DEFAULT 1,
	createUser			varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	createDate			datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser			varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate			datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_MediaSource_id PRIMARY KEY NONCLUSTERED (id),
	
	CONSTRAINT FK_MediaSource_mediaTypeId FOREIGN KEY (mediaTypeId) REFERENCES MediaType(id)
)
go

-- ********
-- Category
-- ********
if exists(select name from sysobjects where name = 'Category')
drop table Category
go

CREATE TABLE Category
(
	id 				tinyint 		IDENTITY,
    categoryName 	varchar(100) 	NOT NULL,
	sortSeq 		tinyint				NULL,
	active			bit				NOT NULL	DEFAULT 1,
	createUser		varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	createDate		datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser		varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate		datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_Category_id PRIMARY KEY NONCLUSTERED (id)
)
go

-- ********
-- Reporter
-- ********
if exists(select name from sysobjects where name = 'Reporter')
drop table Reporter
go

CREATE TABLE Reporter
(
	id 					int 			IDENTITY, 
    reporterFirstName 	varchar(50) 	NOT NULL,
    reporterLastName 	varchar(50) 	NOT NULL,
	sortSeq 			int					NULL,
	active				bit				NOT NULL	DEFAULT 1,
	createUser			varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	createDate			datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser			varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate			datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_Reporter_id PRIMARY KEY NONCLUSTERED (id)
)
go

-- **********
-- Subscriber
-- **********
if exists(select name from sysobjects where name = 'Subscriber')
drop table Subscriber
go

CREATE TABLE Subscriber
(
	id 						int 			IDENTITY, 
    subscriberFirstName 	varchar(50) 	NOT NULL,
    subscriberLastName 		varchar(50) 	NOT NULL,
    subscriberEmailAddress 	varchar(255) 	NOT NULL,
	sortSeq 				int					NULL,
	active					bit				NOT NULL	DEFAULT 1,
	createUser				varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	createDate				datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser				varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate				datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_Subscriber_id PRIMARY KEY NONCLUSTERED (id)
)
go


-- *******
-- Article
-- *******
if exists(select name from sysobjects where name = 'Article')
drop table Article
go

CREATE TABLE Article
(
	id 						int 			IDENTITY, 
	mediaTypeId 			tinyint			NOT NULL,
	mediaSourceId 			int					NULL,
    otherMediaSourceName 	varchar(200) 	NOT NULL,
    title			 		varchar(500) 	NOT NULL,
    reporterId 				int 				NULL,
	otherReporterName 		varchar(200) 		NULL,
	articleDate				date			NOT	NULL,
	articleURL				varchar(500)		NULL,
	disabled				bit				NOT NULL	DEFAULT 0,
	subscriberId			int 			NOT NULL,
	createDate				datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser				varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate				datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_Article_id PRIMARY KEY NONCLUSTERED (id),
	
	CONSTRAINT FK_Article_mediaTypeId FOREIGN KEY (mediaTypeId) REFERENCES MediaType(id),
	CONSTRAINT FK_Article_mediaSourceId FOREIGN KEY (mediaSourceId) REFERENCES MediaSource(id),
	CONSTRAINT FK_Article_reporterId FOREIGN KEY (reporterId) REFERENCES Reporter(id),
	CONSTRAINT FK_Article_subscriberId FOREIGN KEY (subscriberId) REFERENCES Subscriber(id)
)
go

-- *******
-- Reply
-- *******
if exists(select name from sysobjects where name = 'Reply')
drop table Reply
go

CREATE TABLE Reply
(
	id 						int 			IDENTITY, 
	articleId 				int				NOT NULL,
	categoryId 				tinyint			NOT	NULL,
    subject 				varchar(500) 	NOT NULL,
    replyText			 	varchar(4000) 	NOT NULL,
    articleThumbsUpDown 	tinyint 		NOT	NULL	DEFAULT 0,
	disabled				bit				NOT NULL	DEFAULT 0,
	subscriberId			int 			NOT NULL,
	createDate				datetime		NOT NULL	DEFAULT GETDATE(),
	updateUser				varchar(100) 	NOT NULL	DEFAULT SYSTEM_USER,
	updateDate				datetime		NOT NULL	DEFAULT GETDATE(),
	
    CONSTRAINT PK_Reply_id PRIMARY KEY NONCLUSTERED (id),
	
	CONSTRAINT FK_Reply_articleId FOREIGN KEY (articleId) REFERENCES Article(id),
	CONSTRAINT FK_Reply_categoryId FOREIGN KEY (categoryId) REFERENCES Category(id),
	CONSTRAINT FK_Reply_subscriberId FOREIGN KEY (subscriberId) REFERENCES Subscriber(id)
)
go