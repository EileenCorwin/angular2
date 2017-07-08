USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	FUNCTION: fGetRepliers
 
	PURPOSE: Get repliers, active only (not disabled) or active/inactive (dis/abled)
	June 2017
	Eileen Corwin		
	REVISIONS:	
 
	Parameters:
	1) @i_activeOnly

************************************************************************************************************************/
/* Drop */
IF EXISTS(SELECT * FROM Information_Schema.Routines Where Routine_Name = 'fGetRepliers')
	DROP FUNCTION fGetRepliers
GO
/***********************************************************************************************************************/


CREATE FUNCTION fGetRepliers(@i_activeOnly bit=1)

RETURNS Table  
AS

RETURN(
		SELECT	id, replierName
		FROM	vReplier
		WHERE	1 = CASE WHEN @i_activeOnly = 1 and active = 1 and disabled = 0 THEN 1
						 WHEN @i_activeOnly = 1 and (active = 0 or disabled = 1) THEN 0
						 ELSE 1
						 END
	  ) 

GO


