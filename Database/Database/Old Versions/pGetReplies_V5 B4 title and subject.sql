USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
/************************************************************************************************************************
	STORED PROCEDURE: pGetReplies

	PURPOSE:	Get replies
	DATE:		May 2017
	AUTHOR:		Eileen Corwin		
	REVISIONS:	

	PARAMETERS:
	 1) mediaTypeId
	 2) mediaSourceId
	 3) otherMediaSourceId
	 4) @i_reporterId
	 5) @i_otherReporterId

	 6) categoryId
	 7) replierId

************************************************************************************************************************/
/* Drop procedure */
IF EXISTS ( SELECT name FROM SYSOBJECTS WHERE name = 'pGetReplies' )
	DROP PROCEDURE  pGetReplies
GO

/***********************************************************************************************************************/

CREATE PROCEDURE pGetReplies  @i_mediaTypeId varchar(100)
							 ,@i_mediaSourceId varchar(100)
							 ,@i_otherMediaSourceId varchar(100)
							 ,@i_reporterId varchar(100)
							 ,@i_otherReporterId varchar(100)

							 ,@i_categoryId varchar(100)
							 ,@i_replierId varchar(100)
AS

BEGIN
	SET NOCOUNT ON  
	SET ANSI_WARNINGS ON
	SET QUOTED_IDENTIFIER OFF
	SET ANSI_NULLS ON  

	/* Output variables */
	DECLARE @SQL varchar(2000)

	/* -------------------------- */
	/* Filter article table first */
	/* -------------------------- */
	SET @SQL = 'DECLARE @ArticleFiltered TABLE(id int)'
	SET @SQL =	@SQL + ' ' + '
				INSERT INTO @ArticleFiltered
				SELECT	a.id
				FROM	Article a
						left outer join vOtherMediaSource oms 
							 on a.mediaSourceId = 0 
								and a.mediaTypeId = oms.mediaTypeId 
								and a.otherMediaSourceName = oms.mediaSourceName
								and a.disabled = oms.disabled
						left outer join vOtherReporter orptr 
							 on a.reporterId = 0 
								and a.otherReporterName = orptr.reporterName
								and a.disabled = orptr.disabled
				WHERE	1 = 1
				'

	IF @i_mediaTypeId <> ''
		SET @SQL = @SQL + ' and a.mediaTypeId in (' + @i_mediaTypeId + ')'

	-- media source regular or other
	IF @i_mediaSourceId <> '' AND @i_otherMediaSourceId <> '' 
		SET @SQL = @SQL + ' and (a.mediaSourceId in (' + @i_mediaSourceId + ')' + 
						  ' or oms.id in (' + @i_otherMediaSourceId + '))'
	ELSE IF @i_mediaSourceId <> ''
		SET @SQL = @SQL + ' and a.mediaSourceId in (' + @i_mediaSourceId + ')'
	ELSE IF @i_otherMediaSourceId <> ''
		SET @SQL = @SQL + ' and oms.id in (' + @i_otherMediaSourceId + ')'

	-- reporter regular or other
	IF @i_reporterId <> '' AND @i_otherReporterId <> '' 
		SET @SQL = @SQL + ' and (a.reporterId in (' + @i_reporterId + ')' + 
						  ' or orptr.id in (' + @i_otherReporterId + '))'
	ELSE IF @i_reporterId <> ''
		SET @SQL = @SQL + ' and a.reporterId in (' + @i_reporterId + ')'
	ELSE IF @i_otherMediaSourceId <> ''
		SET @SQL = @SQL + ' and orptr.id in (' + @i_otherReporterId + ')'


	/* --------------------*/
	/* Build SQL statement */
	/*---------------------*/
	SET @SQL =	@SQL + ' ' + '
	            SELECT	r.id replyId
						, mt.mediaTypeName
						, case when a.mediaSourceId = 0 then a.otherMediaSourceName
								else ms.mediaSourceName end mediaSourceName
						
						, a.title
						, case when a.reporterId = 0 then a.otherReporterName
								else rpt.reporterFirstName + '' '' + rpt.reporterLastName end reporterName
						, a.articleDate

						, c.categoryName
						, r.subject
						, r.replyText
						, sub.subscriberFirstName + '' '' + sub.subscriberLastName replierName
						, r.createDate replyDate
						, r.articleThumbsUpDown
				FROM	@ArticleFiltered f join Article a on f.id = a.id
						join Reply r on a.id = r.articleId
						join MediaType mt on a.mediaTypeId = mt.id
						join MediaSource ms on a.mediaSourceId = ms.id
						join Category c on r.categoryId = c.id
						join Reporter rpt on a.reporterId = rpt.id
						join Subscriber sub on r.subscriberId = sub.id
				WHERE	1 = 1'

	IF @i_categoryId <> '' SET @SQL = @SQL + ' and r.categoryId in (' + @i_categoryId + ')'
	IF @i_replierId <> '' SET @SQL = @SQL + ' and r.subscriberId in (' + @i_replierId + ')'

	/*-------------------*/
	/* Run SQL as Return */
	/*-------------------*/
	EXEC(@SQL)

END

GO


