/************************************************************************************************************************
	STORED PROCEDURE: pInsertReply

	PURPOSE:	Insert Reply
	DATE:		May 2017
	AUTHOR:		Eileen Corwin		
	REVISIONS:	

	PARAMETERS:
	 1) mediaTypeId
	 2) mediaSourceId
	 3) otherMediaSourceName
	 4) title
	 5) reporterId
	 6) otherReporterName
	 7) articleDate
	 8) articleURL
	 9) subscriberId
	10) categoryId
	11) subject
	12) replyText
	13) articleThumbsUpDown

************************************************************************************************************************/
/* Drop procedure */
IF EXISTS ( SELECT name FROM SYSOBJECTS WHERE name = 'pInsertReply' )
	DROP PROCEDURE  pInsertReply
GO
/***********************************************************************************************************************/

CREATE PROCEDURE pInsertReply  @i_mediaTypeId tinyint,
							   @i_mediaSourceId int,
							   @i_otherMediaSourceName varchar(200),
							   @i_title varchar(500),
							   @i_reporterId int,
							   @i_otherReporterName varchar(200),
							   @i_articleDate datetime,
							   @i_articleURL varchar(500),
							   @i_subscriberId int,

							   @i_categoryId int,
							   @i_subject varchar(500),
							   @i_replyText varchar(4000),
							   @i_articleThumbsUpDown smallint
AS

BEGIN
	SET NOCOUNT ON  
	SET ANSI_WARNINGS ON
	SET QUOTED_IDENTIFIER OFF
	SET ANSI_NULLS ON
	
	/* Miscellaneous variables */
	DECLARE @articleId int
	DECLARE @disabled bit  

	/* Output variables */
	DECLARE @ReturnVal int
	DECLARE @ReturnMsg varchar(500)=''

	BEGIN TRY
		BEGIN TRANSACTION

		----------------------------------------
		--Check if Article record already exists
		----------------------------------------
		SET @ReturnMsg='Error checking for existing Article record.'

		SELECT	@articleId = id, @disabled = disabled
		FROM	Article
		WHERE	mediaTypeId = @i_mediaTypeId
				and mediaSourceId = @i_mediaSourceId
				and isnull(otherMediaSourceName, '') = isnull(@i_otherMediaSourceName, '')
				and title = @i_title
				and reporterId = @i_reporterId
				and isnull(otherReporterName, '') = isnull(@i_otherReporterName, '')
				and articleDate = convert(varchar(10), @i_articleDate, 112)
				and isnull(articleURL, '') = isnull(@i_articleURL, '')

		--article already exists but is disabled, therefore cannot post a reply
		IF IsNull(@articleId, 0) > 0 and IsNull(@disabled, 0) = 1
		BEGIN
			SET @ReturnMsg='Cannot post a reply to this Article.';
			THROW 51000, @ReturnMsg, 1;
		END

		----------------------------------------------------------
		--Create Article record - if article record does not exist
		----------------------------------------------------------
		IF IsNull(@articleId, 0) = 0
		BEGIN
			SET @ReturnMsg='Error inserting Article record.'

			INSERT INTO Article
			(mediaTypeId, mediaSourceId, otherMediaSourceName, title, reporterId, otherReporterName, articleDate, articleURL, subscriberId)
			VALUES (@i_mediaTypeId,
					@i_mediaSourceId,
					@i_otherMediaSourceName,
					@i_title,
					@i_reporterId,
					@i_otherReporterName,
					@i_articleDate,
					@i_articleURL,
					@i_subscriberId
				   )

			-----------------------
			--Get Article record ID
			-----------------------
			SET @ReturnMsg='Error retrieving articleId.'

			SELECT @articleId = SCOPE_IDENTITY()
		END

		---------------------
		--Create Reply record
		---------------------
		SET @ReturnMsg='Error inserting Reply record.'

		INSERT INTO Reply
		(articleId, categoryId, subject, replyText, articleThumbsUpDown, subscriberId)
		VALUES (@articleId,
				@i_categoryId,
				@i_subject,
				@i_replyText,
				@i_articleThumbsUpDown,
				@i_subscriberId
			   )

		SET @ReturnVal=1
		SET @ReturnMsg='Successful'

		COMMIT TRANSACTION

	END TRY

	BEGIN CATCH
		SET @ReturnVal=-1
		SET @ReturnMsg=@ReturnMsg + '<BR>' + cast(ERROR_NUMBER() as varchar) + ' - ' + ERROR_MESSAGE()

		ROLLBACK TRANSACTION

	END CATCH

	/*--------*/
	/* Return */
	/*--------*/
	SELECT  @ReturnVal as ReturnVal
		   ,@ReturnMsg as ReturnMsg

END

GO
/***********************************************************************************************************************/
/* Grant procedure */
GRANT EXECUTE ON pInsertReply to PUBLIC
GO