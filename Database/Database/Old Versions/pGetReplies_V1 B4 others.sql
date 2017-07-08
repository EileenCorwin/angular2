USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/***********************************************************************************************************************/

CREATE PROCEDURE pGetReplies  @i_mediaTypeId varchar(100)
							 ,@i_mediaSourceId varchar(100)
							 ,@i_categoryId varchar(100)
AS

BEGIN
	SET NOCOUNT ON  
	SET ANSI_WARNINGS ON
	SET QUOTED_IDENTIFIER OFF
	SET ANSI_NULLS ON  

	/* Output variables */
	DECLARE @SQL varchar(2000)

	/* --------------------*/
	/* Build SQL statement */
	/*---------------------*/
	SET @SQL = 'SELECT	mt.id mediaTypeId, ms.id mediaSourceId, c.id categoryId
						, mt.mediaTypeName
						, case when a.mediaSourceId = 0 then a.otherMediaSourceName
								else ms.mediaSourceName end mediaSourceName
						, c.categoryName
						, a.title

						, case when a.reporterId = 0 then a.otherReporterName
								else rpt.reporterFirstName + '' '' + rpt.reporterLastName end reporter
						, r.replyText
				FROM	Article a join Reply r on a.id = r.articleId
						join MediaType mt on a.mediaTypeId = mt.id
						join MediaSource ms on a.mediaSourceId = ms.id
						join Category c on r.categoryId = c.id
						join Reporter rpt on a.reporterId = rpt.id
				WHERE	1 = 1'

	IF @i_mediaTypeId <> '' SET @SQL = @SQL + ' and a.mediaTypeId in (' + @i_mediaTypeId + ')'
	IF @i_mediaSourceId <> '' SET @SQL = @SQL + ' and a.mediaSourceId in (' + @i_mediaSourceId + ')'
	IF @i_categoryId <> '' SET @SQL = @SQL + ' and r.categoryId in (' + @i_categoryId + ')'


	/*-------------------*/
	/* Run SQL as Return */
	/*-------------------*/
	EXEC(@SQL)

END

GO


