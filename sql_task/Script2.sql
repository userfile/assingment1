use project
go


select c.EntityName, convert(varchar,  a.BalanceDate ,101)  as [Date], cast(a.Balance  as decimal(10,2)) as Balance, case when b.statusdate is null then (select top 1 Status from [Status] where StatusDate <= a.BalanceDate and entityid=a.entityid) 
else b.Status end  as Status from Balances a left join Status b on a.BalanceDate=b.StatusDate inner join Entity c on a.entityid=c.entityid order by a.entityid desc
