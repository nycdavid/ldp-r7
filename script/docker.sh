#! /bin/bash

sudo docker run \
	-d \
	-it \
	-e POSTGRES_HOST_AUTH_METHOD=trust \
	-e PGDATA=/pgdata \
	-v $PGDATAPATH:/pgdata \
	-p 5432:5432 \
	postgres:14
