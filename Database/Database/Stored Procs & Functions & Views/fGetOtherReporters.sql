USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	FUNCTION: fGetOtherReporters
 
	PURPOSE: Get other reporters, active only (not disabled) or active/inactive (dis/abled)
	June 2017
	Eileen Corwin		
	REVISIONS:	
 
	Parameters:
	1) @i_activeOnly

************************************************************************************************************************/
/* Drop */
IF EXISTS(SELECT * FROM Information_Schema.Routines Where Routine_Name = 'fGetOtherReporters')
	DROP FUNCTION fGetOtherReporters
GO
/***********************************************************************************************************************/


CREATE FUNCTION fGetOtherReporters(@i_activeOnly bit=1)

RETURNS Table  
AS

RETURN(
		SELECT	id, reporterName
		FROM	vOtherReporter
		WHERE	1 = CASE WHEN @i_activeOnly = 1 and disabled = 0 THEN 1
						 WHEN @i_activeOnly = 1 and disabled = 1 THEN 0
						 ELSE 1
						 END
	  ) 

GO


