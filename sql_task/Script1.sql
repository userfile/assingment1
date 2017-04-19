


create database project

go

use project
go

create table [Entity](EntityId int identity (1,1) primary key,EntityName Varchar(50))


create table [Balances](EntityId int foreign key (EntityId) references Entity ,BalanceDate DateTime,Balance decimal)


create table [Status](EntityId int foreign key (EntityId) references Entity ,StatusDate DateTime,Status Varchar(2))



select * from Entity

select * from Balances

select * from Status

insert into Entity values('ABCD')
insert into Entity values('XYZ')

select * from Balances

insert into Balances values(1,'5/1/2010',100.00)

insert into Balances values(1,'4/1/2010',50.00)

insert into Balances values(1,'3/1/2010',75.00)

insert into Balances values(1,'2/1/2010',85.00)

insert into Balances values(2,'5/1/2010',110.00)

insert into Status values(1,'5/29/2010','A')
insert into Status values(1,'4/16/2010','B')
insert into Status values(1,'4/2/2010','C')
insert into Status values(1,'2/26/2010','D')
insert into Status values(2,'5/1/2010','B')

select * from Status