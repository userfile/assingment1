use project
go


select distinct (a.entityname) as EntityName,
(select top 1 status from status where entityid=c.entityid order by statusdate desc) as [Status],
Convert(varchar,  (select top 1 statusdate from status where entityid=c.entityid order by statusdate desc) ,101) as [AS Of],
cast((select avg(balance) from Balances where entityid = a.entityid)  as decimal(10,2))   as [AVG Balance] 
from entity a inner join status c on a.entityid = c.entityid  order by a.entityname desc