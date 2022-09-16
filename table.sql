create table user(
    id varchar(20) primary key,
    name varchar(50),
    email varchar(50),
    password varchar(50),
    role varchar(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `bookingsystem`.`user` (`id`, `name`, `password`, `email`, `role`) VALUES ('PR100', 'admin', 'sign', 'admin@gmail.com', 'Admin');

insert into user(name, password,status,role)values('User','sign','false','user');

create table book(
    id int primary key AUTO_INCREMENT,
    type varchar(50)  NOT NULL,
    start_date varchar(20)  NOT NULL,
    end_date varchar(20)  NOT NULL,
    start_time varchar(20)  NOT NULL,
    end_time varchar(20)  NOT NULL,
    reason varchar(255)  NOT NULL,
    status varchar(20),
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

