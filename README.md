# E2E Analytics Dashboard Application
* React Analytics UI
* Node.js Express API
* Mongo DB
* Postgresql

## Overview

This repository is meant to be a starter kit for creating your own dashboard. It includes a React UI, an Express API, and two databases (Postgres and MongoDB). A basic JWT authentication system has been created between React and Express - users must log in order to access the various pages and data. All the connections have been created and organized, and I have recommended some best practices I have learned in my career when designing dashboards for various clients.

Within the React application / pages itself, I organized different components that I find myself using the most often, with simple examples to follow. The data is retrieved from the API. In my example, the data is hardcoded to the API, but connections have been made to Postgres and MongoDB to query from there.

This dashboard can be a good scaffolding from which to learn more about any individual component, or to extend into your own application. The containerization for each microservices has also been created.

## Running Locally - Docker

To see this application as is without needing to install anything, simply navigate to the root directory, run `docker-compose up`, and visit `http://localhost:80` in your browser. If you wish to eventually deploy this application with your changes, you will need to rebuild these images to see your updates.

## Running Locally - Development

### user_interface

1. Add a `.env` under the `user_interface` directory that includes:

* REACT_APP_API_URL=http://localhost:8080

2. run `npm install` inside `user_interface`

3. run `npm start` inside `user_interface`

### api

*PLEASE NOTE: on error in API routes, send back a status of 500. A status of 401 or 403 will cause the client to logout*

1. Add a `.env` under the `api` directory that includes:

* NODE_ENV=development
* CRA_URL=http://localhost:3000
* MONGODB_URL=mongodb://admin:admin@localhost:27017
* JWT_SECRET=WeNeedABetterSecretThanThisInProd
* PORT=8080
* PG_HOST=localhost
* PG_USER=admin
* PG_PASSWORD=admin
* PG_DATABASE=vault_pg

2. run `npm install` inside `api`

3. run `npm start` inside `api`

### Mongo DB

1. make sure you have Docker running

2. run `docker run -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -e MONGO_INITDB_DATABASE=vault_db -p 27017:27017 mongo`

### Postgresql

1. make sure you have Docker running

2. run `docker run -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=vault_pg -p 5432:5432 postgres`
