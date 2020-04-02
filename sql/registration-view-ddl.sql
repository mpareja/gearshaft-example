create table registration_view (
	email_address text not null,
	data jsonb not null,
	version bigint not null,
	primary key (email_address)
);

grant select, update, insert, delete
on registration_view
to message_store;
