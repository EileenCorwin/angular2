/************************************************************************************************************************
	STORED PROCEDURE: pGetReplies

	PURPOSE:	Get Replies based on filters
	DATE:		March 2017
	AUTHOR:		Eileen Corwin		
	REVISIONS:	

	PARAMETERS:
	1) mediaTypeIds		list, null=''
	2) mediaSourceIds	list, null=''
	3) categoryIds		list, null=''

************************************************************************************************************************/
/* Drop procedure */
IF EXISTS ( SELECT name FROM SYSOBJECTS WHERE name = 'pGetReplies' )
	DROP PROCEDURE  pGetReplies
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
	SET @SQL = 'SELECT	mt.mediaTypeName, ms.mediaSourceName, c.categoryName, r.title, r.reporter, r.replyText
            FROM	Reply r
					join MediaType mt on r.mediaTypeId = mt.id
					join MediaSource ms on r.mediaSourceId = ms.id
					join Category c on r.categoryId = c.id
			WHERE	1 = 1'

	IF @i_mediaTypeId <> '' SET @SQL = @SQL + ' and r.mediaTypeId in (' + @i_mediaTypeId + ')'
	IF @i_mediaSourceId <> '' SET @SQL = @SQL + ' and r.mediaSourceId in (' + @i_mediaSourceId + ')'
	IF @i_categoryId <> '' SET @SQL = @SQL + ' and r.categoryId in (' + @i_categoryId + ')'


	/*-------------------*/
	/* Run SQL as Return */
	/*-------------------*/
	EXEC(@SQL)

END
GO
/***********************************************************************************************************************/
/* Grant procedure */
GRANT EXECUTE ON pGetReplies to PUBLIC
GO