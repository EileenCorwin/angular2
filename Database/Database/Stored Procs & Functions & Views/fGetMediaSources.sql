USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	FUNCTION: fGetMediaSources
 
	PURPOSE: Get media sources, active only or active/inactive, all or by media type
	May 2017
	Eileen Corwin		
	REVISIONS:	
 
	Parameters:
	1) @i_activeOnly
	2) @i_mediaTypeId (0=all)
************************************************************************************************************************/
/* Drop */
IF EXISTS(SELECT * FROM Information_Schema.Routines Where Routine_Name = 'fGetMediaSources')
	DROP FUNCTION fGetMediaSources
GO
/***********************************************************************************************************************/


CREATE FUNCTION fGetMediaSources(@i_activeOnly bit=1, @i_mediaTypeId tinyint=0)

RETURNS Table  
AS

RETURN(
		SELECT	*
		FROM	MediaSource
		WHERE	1 = CASE WHEN @i_activeOnly = 1 and active = 1 THEN 1
						 WHEN @i_activeOnly = 1 and active = 0 THEN 0
						 ELSE 1
						 END
				AND
				1 = CASE WHEN @i_mediaTypeId = 0 THEN 1
						 WHEN mediaTypeId = @i_mediaTypeId THEN 1
						 END 
	  ) 


GO


