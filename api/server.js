const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authJWT = require('./middleware/authJWT');
const loginRoutes = require('./loginRoutes');
const dataRoutes = require('./dataRoutes');


app.listen(process.env.PORT || 8080, () => console.log("vault_db api is listening on port 8080!"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// this allows setting cookie in client browser
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// CORS options
const whitelist = [process.env.CRA_URL];
// allows Postman testing to not be blocked by CORS
if (process.env.NODE_ENV === 'development') {
  whitelist.push(undefined);
}
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(origin);
      console.log(process.env.CRA_URL)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));

app.get('/health_check', (req, res) => {

  res.send('vault_db api is live!');

})

// routes for user login/access
app.use('/access', loginRoutes);

// routes for accessing data from postgres
app.use('/data', authJWT,  dataRoutes);