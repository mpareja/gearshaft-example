create table registration_view (
	email_address text not null,
	data jsonb not null,
	version bigint not null,
	primary key (email_address)
);
