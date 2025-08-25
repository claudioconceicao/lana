create database beevaDb;

use beevaDb;

create table users {
	user_id int primary key auto_increment,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	date_of_birth date not null,
	gender char not null,
	phone_number varchar(20),
	email_address varchar(100) not null unique,
	status varchar(20),
	street varchar(100) not null,
	city varchar(50) not null,
	state varchar(50) not null,
	postcode varchar(20),
	country varchar(50) not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp
}

create table propertyTypes{
	property_type_id int primary key auto_increment,
	name varchar(20),
}

create table properties {
	property_id int primary key auto_increment,
	property_type int not null,
	max_guests int not null,
	no_of_bedrooms int not null,
	no_of_bathrooms int not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp

	foreign_key (property_type) references propertyTypes(property_type_id)
}

create table amenities {
	amenity_id int primary key auto_increment,
	name varchar(50) not null
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp
}

create table properties_amenities {
	property_id int not null,
	amenity_id int not null,
	primary key (property_id, amenity_id),
	foreign key (property_id) references properties(property_id),
	foreign key (amenity_id) references amenities(amenity_id)
}

create table accommodationTypes {
	accommodation_type_id primary key auto_increment,
	name varchar(20)
}

create table listings {
	listing_id int primary key auto_increment,
	host_id int not null,
	property_id int not null,
	address_id int not null,
	cancellation_policy int not null,
	title varchar(100) not null,
	description text not null,
	name varchar(20),
	accommodation_type int not null,
	price_per_night float not null,
	deposit float
	weekend_price float not null,
	weekly_discount float,
	monthly_discount float,
	pet_fee float,
	cleaning_fee float,
	extra_guest_fee float,
	is_rented boolean,
	max_stay int not null,
	min_stay int not null,
	status varchar(20) not null,
	checkin_window time not null,
	checkout_time time not null,

	foreign key (host_id) references Users(user_id),
	foreign key (property_id) references Properties(property_id),
	foreign key (accommodation_type) references accommodationTypes(accommodation_type_id),
	foreign key (address_id) references propertyAddresses(address_id),
	foreign key (cancellation_policy) references cancellationPolicies(policy_id)

}

create table propertyAddresses {
	address_id int primary key auto_increment,
	street varchar(255) not null,
	city varchar(100) not null,
	state varchar(100),
	country varchar(100) default 'Angola' not null,
	post_code varchar(20),
	latitude decimal(9,6),
	longitude decimal(9,6),
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp
}

create table favourites {
	user_id int not null,
	listing_id int not null,
	created_at timestamp default current_timestamp,
	primary key (user_id, listing_id),
	foreign key (user_id) references users(user_id),
	foreign key (listing_id) references listings(listing_id),

}

create table cancellationPolicies{
	policy_id int primary key auto_increment,
	name varchar(20) not null,
	description text not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp

}

create table bookings {
	booking_id int primary key auto_increment,
	listing_id int not null,
	guest_id int not null,
	start_date date not null,
	end_date date not null,
	total_price float not null,
	status enum('Pending', 'Confirmed', 'Cancelled', 'Completed') default 'Pending'
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp
	foreign key (guest_id) references users(user_id),
	foreign key (listing_id) references listings(listing_id),
}

create table cancelledBookings {
	cancelled_booking_id int primary key auto increment,
	booking_id int not null,
	cancelled_at timestamp default current_timestamp,
	cancel_reason text not null,
	cancelled_by enum('Host', 'Guest') not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp on update current_timestamp

	foreign key (booking_id) references bookings(booking_id),
}

create table reviews {
	reviews_id int primary key auto_increment,
	listing_id int not null
	guest_id int not null,
	booking_id int not null,

	foreign key (guest_id) references users(user_id),
	foreign key (listing_id) references listings(listing_id),
	foreign key (booking_id) references bookings(booking_id)
}

create table payments {
	payment_id int primary key auto_increment,
	booking_id int not null,
	payment_method int not null

	foreign key (listing_id) references listings(listing_id),
	foreign key (payment_method) references paymentMethods(payment_method_id)
}

create table paymentMethods {
	payment_method_id int primary key auto_increment,

}

create table messages {
	message_id int primary key auto_increment,
	sender_id int not null,
	receiver_id int not null,

	foreign key (sender_id) references users(user_id),
	foreign key (receiver_id) references users(user_id),
}

create table chats {
	host_id int not null,
	guest_id int not null

	primary key (host_id, guest_id),
	foreign key (host_id) references users(user_id),
	foreign key (guest_id) references users(user_id),
}

create table feedback {
	feedback_id int primary key auto_increment,
	user_id int not null,

	foreign key (user_id) references users(user_id),
}

create table currencies {
	currency_id int primary key auto_increment
}

create table languages {
	language_id int primary key auto increment,

}

create table sessions {
	session_id int primary key auto_increment,
	user_id int not null,

	foreign key (user_id) references users(user_id),
}

create table userDevices {
	device_id int primary key auto_increment,
	user_id int not null,

	foreign key (user_id) references users(user_id)
}

create table roles {
	role_id int primary key auto_increment
}

create table permissions {
	permission_id int primary key auto_increment
}

create table rolePermissions {
	role_permission_id int primary key auto_increment,
	role_id int not null,
	permission_id int not null,

	foreign key (role_id) references roles(role_id),
	foreign key (permission_id) references permissions(permission_id),
}

create table userPermissions {
	user_permissions int a
}
