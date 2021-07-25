# be-node-mongo-registration-login-api

## Summary

This is a NodeJS service for user management, authentication and registration with MongoDB as database.

## Test service locally with docker-compose

### Prerequisites
1. [Docker](https://docs.docker.com/get-docker/)
2. [docker-compose](https://docs.docker.com/compose/install/)

If you want to test service locally, launch the following command:

```
docker-compose up -d --build
```

The command above will run NodeJS service and MongoDB instance as Docker containers.

## APIs index

This is the index of available APIs, you can test them both locally and inside `node-mongo-registration-login-api` container:

* [GET - Get all users](#1-get---get-all-users)
* [POST - Add user](#2-post---add-user)
* [POST - Register user](#3-post---register-user)
* [PUT - Update user](#4-put---update-user)
* [DELETE - Delete user](#4-delete---delete-user)
--------

### 1. GET - Get all users



***Example:***

```bash
$ curl --location --request GET 'http://localhost:4000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGZkMTA4NmY2OTQ3NTAwMTNmZTVlNDIiLCJpYXQiOjE2MjcxOTc2MDYsImV4cCI6MTYyNzgwMjQwNn0.p0duTQTanZpYTuaMc1CJwEP8g7riEM9cJbIHazFdWRI'
```

***Expected output:***

```bash
[
    {
        "firstName": "Marco",
        "lastName": "Rossi",
        "username": "marco",
        "createdDate": "2021-07-25T07:19:34.831Z",
        "id": "60fd1086f694750013fe5e42"
    },
    {
        "firstName": "Luca",
        "lastName": "Bianchi",
        "username": "luca",
        "createdDate": "2021-07-25T07:23:13.617Z",
        "id": "60fd1161f694750013fe5e43"
    }
]
```



### 2. POST - Add user



***Example:***

```bash
$ curl --location --request POST 'http://localhost:4000/users/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "marco",
    "password": "password123"
}'
```

***Expected output:***

```bash
{
    "firstName": "Marco",
    "lastName": "Rossi",
    "username": "marco",
    "createdDate": "2021-07-25T07:19:34.831Z",
    "id": "60fd1086f694750013fe5e42",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGZkMTA4NmY2OTQ3NTAwMTNmZTVlNDIiLCJpYXQiOjE2MjcxOTc2MDYsImV4cCI6MTYyNzgwMjQwNn0.p0duTQTanZpYTuaMc1CJwEP8g7riEM9cJbIHazFdWRI"
}
```



### 3. POST - Register user



***Example:***

```bash
$ curl --location --request POST 'http://localhost:4000/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Marco",
    "lastName": "Rossi",
    "username": "marco",
    "password": "password123"
}'
```

***Expected output:***

```bash
{}
```



### 4. PUT - Update user



***Example:***

```bash
$ curl --location --request PUT 'http://localhost:4000/users/60fd1086f694750013fe5e42' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGZkMTA4NmY2OTQ3NTAwMTNmZTVlNDIiLCJpYXQiOjE2MjcxOTc2MDYsImV4cCI6MTYyNzgwMjQwNn0.p0duTQTanZpYTuaMc1CJwEP8g7riEM9cJbIHazFdWRI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Francesco",
    "lastName": "Verdi"
}'
```

***Expected output:***

```bash
{}
```


### 5. DELETE - Delete user



***Example:***

```bash
$ curl --location --request DELETE 'http://localhost:4000/users/60fd1086f694750013fe5e42' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGZkMTA4NmY2OTQ3NTAwMTNmZTVlNDIiLCJpYXQiOjE2MjcxOTc2MDYsImV4cCI6MTYyNzgwMjQwNn0.p0duTQTanZpYTuaMc1CJwEP8g7riEM9cJbIHazFdWRI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Francesco",
    "lastName": "Verdi"
}'
```

***Expected output:***

```bash
{}
```


## Check data on MongoDB database

If you want to check that data have been inserted or removed correctly, launch following commands:

```bash
$ docker exec -it mongo /bin/bash

$ mongo mongodb://localhost:27017/replicaSet=rs0

> use node-mongo-registration-login-api

> db.users.find()
{ "_id" : ObjectId("60fd1086f694750013fe5e42"), "firstName" : "Francesco", "lastName" : "Verdi", "username" : "marco", "createdDate" : ISODate("2021-07-25T07:19:34.831Z"), "hash" : "$2a$10$choSzHV5uj4RGO7vdvZlCO2pfrAYzyjJcZ5UB.ObwaRCN9aDwIPqy", "__v" : 0 }
{ "_id" : ObjectId("60fd1161f694750013fe5e43"), "firstName" : "Luca", "lastName" : "Bianchi", "username" : "luca", "createdDate" : ISODate("2021-07-25T07:23:13.617Z"), "hash" : "$2a$10$j7Q.8v13P7LyCxM5i5UBceMH23aBQSppgDDyMV6oeBQU/BbxUxawq", "__v" : 0 }
```



---
[Back to top](#be-node-mongo-registration-login-api)