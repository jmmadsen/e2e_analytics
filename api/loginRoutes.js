const express = require('express');
const router = express.Router();

const connectMongoDB = require('./mondgodb/connect');
const createUsersCollection = require('./mondgodb/createUsersCollection');
const checkUser = require('./mondgodb/checkUser');
const getUserInfo = require('./mondgodb/getUserInfo');
const verifyUser = require('./mondgodb/verifyUser');
const addUser = require('./mondgodb/addUser');
// authJWT is used to create protected routes, users must have login cookie to access
const authJWT = require('./middleware/authJWT');
const updateUserPassword = require('./mondgodb/updateUserPassword');


router.get('/create_users_collection', async (req, res) => {

  const client = await connectMongoDB();
  createUsersCollection(client);
  res.sendStatus(200);

})

router.get('/check_user', async (req, res) => {

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
router.get('/get_user_info', authJWT, async (req, res) => {

  const { username } = req.query;

  const client = await connectMongoDB();
  const user = await getUserInfo(client, username.toLowerCase());

  if (!user) {
    res.sendStatus(401);
  }

  res.send(user);

})

router.get('/verify_user', async (req, res) => {

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

router.post('/add_user', async (req, res) => {

  const { username, password } = req.body;

  const client = await connectMongoDB();
  const result = await addUser(client, username.toLowerCase(), password);
  res.send(result);

})

router.get('/verify_jwt', authJWT, async (req, res) => {
  
  res.send(res.locals.username);

})

router.get('/sign_out', async (req, res) => {

  res.clearCookie("token");
  res.sendStatus(200);

})

router.put('/update_password', authJWT, async (req, res) => {

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

module.exports = router;