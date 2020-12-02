const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connectMongoDB = require('./mondgodb/connect');
const createUsersCollection = require('./mondgodb/createUsersCollection');
const checkUser = require('./mondgodb/checkUser');
const getUserInfo = require('./mondgodb/getUserInfo');
const verifyUser = require('./mondgodb/verifyUser');
const addUser = require('./mondgodb/addUser');
const authJWT = require('./middleware/authJWT');
const updateUserPassword = require('./mondgodb/updateUserPassword');


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
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));

app.get('/health_check', (req, res) => {

  res.send('vault_db api is live!');

})

app.get('/create_users_collection', async (req, res) => {

  const client = await connectMongoDB();
  createUsersCollection(client);
  res.sendStatus(200);

})

app.get('/check_user', async (req, res) => {

  const { username } = req.query;

  const client = await connectMongoDB();
  const userExists = await checkUser(client, username.toLowerCase());

  if (userExists.length === 0) {
    res.send('false');
  } else {
    res.send('true');
  }

})

// need to restrict this to admin only in the future
app.get('/get_user_info', authJWT, async (req, res) => {

  const { username } = req.query;

  const client = await connectMongoDB();
  const user = await getUserInfo(client, username.toLowerCase());

  if (!user) {
    res.sendStatus(401);
  }

  res.send(user);

})

app.get('/verify_user', async (req, res) => {

  const { username, password } = req.query;

  const client = await connectMongoDB();
  const token = await verifyUser(client, username.toLowerCase(), password);

  if (!token) {
    res.sendStatus(400);
  } else {
    res.cookie("token", token, { maxAge: 3600 * 1000, httpOnly: true })
    res.json({ token });
  }

})

app.post('/add_user', async (req, res) => {

  const { username, password } = req.body;

  const client = await connectMongoDB();
  const result = await addUser(client, username.toLowerCase(), password);
  res.send(result);

})

app.get('/verify_jwt', authJWT, async (req, res) => {
  
  res.send(res.locals.username);

})

app.get('/sign_out', async (req, res) => {

  res.clearCookie("token");
  res.sendStatus(200);

})

app.put('/update_password', authJWT, async (req, res) => {

  const { oldPassword, newPassword } = req.body;

  let client = await connectMongoDB();
  const token = await verifyUser(client, res.locals.username, oldPassword);

  if (!token) {
    res.sendStatus(400);
  } else {
    client = await connectMongoDB();
    const data = await updateUserPassword(client, res.locals.username, newPassword);
    if (!data) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  }

})