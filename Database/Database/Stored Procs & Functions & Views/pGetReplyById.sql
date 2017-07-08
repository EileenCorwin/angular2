USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
/************************************************************************************************************************
	STORED PROCEDURE: pGetReplyById

	PURPOSE:	Get a specific reply
	DATE:		June 2017
	AUTHOR:		Eileen Corwin		
	REVISIONS:	

	PARAMETERS:
	 1) replyId

************************************************************************************************************************/
/* Drop procedure */
IF EXISTS ( SELECT name FROM SYSOBJECTS WHERE name = 'pGetReplyById' )
	DROP PROCEDURE  pGetReplyById
GO

/***********************************************************************************************************************/

CREATE PROCEDURE pGetReplyById @i_replyId int
AS

BEGIN
	SET NOCOUNT ON  
	SET ANSI_WARNINGS ON
	SET QUOTED_IDENTIFIER OFF
	SET ANSI_NULLS ON  

	SELECT	a.mediaTypeId
		, a.mediaSourceId
		, a.otherMediaSourceName
		, a.title
		, a.reporterId
		, a.otherReporterName
		, a.articleDate
		, a.articleURL
		, a.subscriberId
  
		, r.categoryId
		, r.subject
		, r.replyText
		, r.articleThumbsUpDown
	FROM	Article a join Reply r on a.id = r.articleId
	WHERE	r.id = @i_replyId

END

GO


