# natterbase-test

A simple rest api for natterbase test

### HOW TO USE

`git clone ` repo

run `npm install`

run `node app.js` to start the api

API is listening on `localhost:2323`

#### Requests

Login - [POST] `localhost:2323/login` username=admin, password=admin

Get All COUNTRIES - [GET] `localhost:2323/countries`

Add A Country - [PUT] `localhost:2323/countries` body: {country: "name of country"}

Delete A Country - [DELETE] `localhost:2323/countries` body: {country: "name of country"}



