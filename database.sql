create database HospitalManagement;
use HospitalManagement;

create table Users (user_id int primary key auto_increment,username varchar(50) not null,password varchar(100) not null, role enum("Admininstrator","Doctor","Receprtion")); 
create table admins( admin_id  int primary key auto_increment, admin_contact varchar(30) not null, user_id int , foreign key(user_id) references users(user_id));
create table Doctors (doctor_id int primary key auto_increment, doctor_name varchar(40) not null, doctor_specialization varchar(15), doctor_experience int , status varchar(20), user_id int , admin_id int , foreign key(user_id) references users(user_id),foreign key(admin_id) references admins(admin_id));
create table Reception(reception_id int primary key auto_increment, reception_name varchar(30) not null, reception_contact varchar(20) not null, status varchar(20), user_id int , admin_id int,foreign key(user_id) references users(user_id),foreign key(admin_id) references admins(admin_id));
create table rooms(room_no int primary key auto_increment,room_type enum("General Wards","ICU","Delux","Super Delux"),charge_per_day decimal(8,2) );
create table nurse(nurse_id int primary key auto_increment, nurse_name varchar(30) not null,nurse_contact varchar(30) not null,nurse_shift enum("Day","Night") not null);
create table patient(patient_id int primary key auto_increment, patient_name varchar(40) not null, patient_age int not null,patient_gender enum("Male","Female","Other") not null , patient_contact varchar(30) not null, patient_issue varchar(255) not null, admitted_date date not null,discharge_date date not null,
 room_no int , nurse_id int, doctor_id int , status enum("Stable","Critical","Recover","Unconsious"),foreign key(nurse_id) references nurse(nurse_id), foreign key(room_no) references rooms(room_no), foreign key(doctor_id) references doctors(doctor_id)) ;
 
 create table bill (bill_id int primary key auto_increment , patient_id int , room_charge decimal(9,2) not null, treatement_charge decimal(10,2) not null, nurse_charge decimal(10,2) not null, medicine_charge decimal(10,2) not null, total_amount decimal(10,2) not null, billing_date date );
	CREATE TABLE medicines (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		type ENUM('tablet', 'syrup', 'injection', 'capsule') NOT NULL,
		price DECIMAL(8, 2) NOT NULL
	);