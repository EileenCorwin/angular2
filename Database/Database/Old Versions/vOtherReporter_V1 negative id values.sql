USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	VIEW: vOtherReporter
 
	PURPOSE: View of other reporters
	June 2017
	Eileen Corwin		
	REVISIONS:	

************************************************************************************************************************/
/* Drop */
IF EXISTS (SELECT name FROM SYSOBJECTS WHERE name = 'vOtherReporter')
	DROP VIEW vOtherReporter
GO
/***********************************************************************************************************************/

CREATE VIEW vOtherReporter
AS

	SELECT	ROW_NUMBER() OVER (ORDER BY otherReporterName) * -1 id, otherReporterName reporterName, disabled
	FROM	(select distinct otherReporterName, disabled from Article where reporterId = 0) a

GO


