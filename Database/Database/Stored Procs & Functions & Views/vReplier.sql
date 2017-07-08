USE Reply
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/************************************************************************************************************************
	VIEW: vReplier
 
	PURPOSE: View of all repliers
	June 2017
	Eileen Corwin		
	REVISIONS:	

************************************************************************************************************************/
/* Drop */
IF EXISTS (SELECT name FROM SYSOBJECTS WHERE name = 'vReplier')
	DROP VIEW vReplier
GO
/***********************************************************************************************************************/

CREATE VIEW vReplier
AS

	SELECT	distinct s.id, subscriberFirstName + ' ' + subscriberLastName as replierName, s.active, r.disabled
	FROM	Subscriber s join Reply r on s.id = r.subscriberId
GO


