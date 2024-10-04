create database crudnode;

use crudnode;

create table gen_empresas(
idEmpresa INT NOT NULL AUTO_INCREMENT PRIMARY KEY;,
nombre varchar(100) not null,
direccion varchar(200) not null,
direccionfacturacion varchar(200),
representantelegal varchar(100),
telefono varchar(50),
correoelectronico varchar(100),
codigopostal varchar(20),
estado varchar(3) CHECK(estado IN ('A','I','PEN','DES','CAN')),
principal varchar(1) CHECK(principal IN ('S','N')),
adiciono varchar(20) not null,
fechaadicion date
);

create table inv_sucursales(
idSucursal INT NOT NULL AUTO_INCREMENT PRIMARY KEY;,
idEmpresa int not null,
descripcion varchar(100) not null,
direccion varchar(100),
telefono varchar(50),
encargado varchar(50),
estado varchar(3) CHECK(estado IN ('A','I','PEN','DES','CAN')),
constraint fk_SucursalXempresa foreign key (idEmpresa) references crudnode.gen_empresas(idEmpresa)
);

select * from gen_empresas;
select *from inv_sucursales;