USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	FUNCTION: fGetOtherMediaSources
 
	PURPOSE: Get other media sources, active only (not disabled) or active/inactive (dis/abled), all or by media type
	June 2017
	Eileen Corwin		
	REVISIONS:	
 
	Parameters:
	1) @i_activeOnly
	2) @i_mediaTypeId (0=all)

************************************************************************************************************************/
/* Drop */
IF EXISTS(SELECT * FROM Information_Schema.Routines Where Routine_Name = 'fGetOtherMediaSources')
	DROP FUNCTION fGetOtherMediaSources
GO
/***********************************************************************************************************************/


CREATE FUNCTION fGetOtherMediaSources(@i_activeOnly bit=1, @i_mediaTypeId tinyint=0)

RETURNS Table  
AS

RETURN(
		SELECT	distinct ROW_NUMBER() OVER (ORDER BY otherMediaSourceName) * -1 id, otherMediaSourceName mediaSourceName, mediaTypeId
		FROM	Article
		WHERE	mediaSourceId = 0
				AND
				1 = CASE WHEN @i_activeOnly = 1 and disabled = 0 THEN 1
						 WHEN @i_activeOnly = 1 and disabled = 1 THEN 0
						 ELSE 1
						 END
				AND
				1 = CASE WHEN @i_mediaTypeId = 0 THEN 1
						 WHEN mediaTypeId = @i_mediaTypeId THEN 1
						 END 
	  ) 

GO


