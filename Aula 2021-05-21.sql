-- Aula 2021-05-21

create database projetoint1 character set utf8mb4 collate utf8mb4_0900_ai_ci;

create user prjint@'%' identified with mysql_native_password by 'prjint';
grant all privileges on projetoint1.* to prjint@'%';

create table projetoint1.log (
    idlog int not null auto_increment primary key,
    acesso_tm varchar(20),
    acesso_pc varchar(20),
    acesso_ip varchar(15)
);

insert into projetoint1.log (idlog, acesso_tm, acesso_pc, acesso_ip) values (
    null,
    '2021-05-21 12:11:15',
    'jjacer',
    '192.168.56.1'
    );