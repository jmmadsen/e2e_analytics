# vault_react_ui
* React UI
* Node.js Express API
* Mongo DB
* Postgresql

## General Notes

I have included the React UI and an API in here for connecting to MongoDB and Postgres. I also included a docker-compose file for deploying into the cloud. The most important piece of this is the UI foundation, so if needed the `user_interface` directory can be pulled out and refactored accordingly.

This entire application is currently using self-built JWT auth. The API sends a cookie to the browser, which then is used to access protected routes in the API. If a route returns a 401 or 403, the axios interceptor in the client will redirect you to the login page. This is an *okay* method of authentication, not sure how particular we want to be in the code challenge.

When deploying, make sure to update the axios.defaults.baseURL to the cloud URL in `App.js` in the client. This is compiled at build time, and cannot be controlled by an environment variable.

## Running Locally

### user_interface

1. Add a `.env` under the `user_interface` directory that includes:

* REACT_APP_API_URL=http://localhost:8080

2. run `npm install` inside `user_interface`

3. run `npm start` inside `user_interface`

### api

1. Add a `.env` under the `api` directory that includes:

* NODE_ENV=development
* CRA_URL=http://localhost:3000
* MONGODB_URL=mongodb://admin:admin@localhost:27017
* JWT_SECRET=WeNeedABetterSecretThanThisInProd

2. run `npm install` inside `api`

3. run `npm start` inside `api`

### Mongo DB

1. make sure you have Docker running

2. run `docker run -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -e MONGO_INITDB_DATABASE=vault_db -p 27017:27017 mongo`

### Postgresql

1. make sure you have Docker running

2. TBD