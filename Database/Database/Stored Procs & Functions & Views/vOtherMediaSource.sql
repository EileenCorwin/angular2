USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	VIEW: vOtherMediaSource
 
	PURPOSE: View of other media sources
	June 2017
	Eileen Corwin		
	REVISIONS:	

************************************************************************************************************************/
/* Drop */
IF EXISTS (SELECT name FROM SYSOBJECTS WHERE name = 'vOtherMediaSource')
	DROP VIEW vOtherMediaSource
GO
/***********************************************************************************************************************/

CREATE VIEW vOtherMediaSource
AS

	SELECT	distinct ROW_NUMBER() OVER (ORDER BY mediaTypeId, otherMediaSourceName) * -1 id, otherMediaSourceName mediaSourceName, mediaTypeId, disabled
	FROM	(select distinct otherMediaSourceName, mediaTypeId, disabled from Article where mediaSourceId = 0) a

GO


