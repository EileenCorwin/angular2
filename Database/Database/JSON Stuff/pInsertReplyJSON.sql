/************************************************************************************************************************
	STORED PROCEDURE: pInsertReply

	PURPOSE:	Insert Reply
	DATE:		March 2017
	AUTHOR:		Eileen Corwin		
	REVISIONS:	

	PARAMETERS:
	1) JSON

************************************************************************************************************************/
/* Drop procedure */
IF EXISTS ( SELECT name FROM SYSOBJECTS WHERE name = 'pInsertReply' )
	DROP PROCEDURE  pInsertReply
GO
/***********************************************************************************************************************/

CREATE PROCEDURE pInsertReply  @i_JSON NVARCHAR(max)
AS

BEGIN
	SET NOCOUNT ON  
	SET ANSI_WARNINGS ON
	SET QUOTED_IDENTIFIER OFF
	SET ANSI_NULLS ON  

	/* Output variables */
	DECLARE @ReturnVal Int
	DECLARE @ReturnMsg VarChar(500)=''

	BEGIN TRY
		BEGIN TRANSACTION

		---------------------------
		--Get the table With values
		---------------------------
		DECLARE @With varchar (4000) = ''
		SELECT	@With = (@With
						+ COLUMN_NAME + ' ' + 
						case when DATA_TYPE = 'int' then DATA_TYPE
							  when DATA_TYPE = 'varchar' then DATA_TYPE + '(' + cast(CHARACTER_MAXIMUM_LENGTH as varchar(10)) + ')'
							  else DATA_TYPE end
						+ ', ')
		FROM	INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Reply' and COLUMN_NAME <> 'id'
		SET @With = left(@With, Len(@With)-1)

		---------------------------
		--Get the table With values
		---------------------------
		DECLARE @Select varchar (4000) = ''
		SELECT	@Select = (@Select
						+ COLUMN_NAME
						+ ', ')
		FROM	INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Reply' and COLUMN_NAME <> 'id'
		SET @Select = left(@Select, Len(@Select)-1) 

		---------------------
		--Build SQL statement
		---------------------
		DECLARE @SQL varchar(1000) = '';
		SET @SQL = 'insert into Reply'
					+ ' select ' + @Select
					+ ' from OPENJSON (''' + @i_JSON + ''')'
					+ ' with (' + @With + ')'

		---------
		--Run SQL
		---------
		exec(@SQL)

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