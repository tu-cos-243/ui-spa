drop table if exists account;

create table account
(
    id        serial  not null
        constraint account_pk
            primary key,
    firstName varchar not null,
    lastName  varchar not null,
    email     varchar not null
);

comment on table account is 'User Account';

alter table account
    owner to tom;
