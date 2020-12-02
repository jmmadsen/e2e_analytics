const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const verifyUser = async (client, username, password) => {

  try {

    const db = await client.db("vault_db");
    const users = db.collection('users');
    const result = await users.find({ username }).toArray();
      
    const passwordIsValid = bcrypt.compareSync(
      password,
      result.length ? result[0].password : ''
    )

    if (!passwordIsValid) {
      return null;
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN || 3600 // 1 hour
    });

    await client.close();

    return token;

  } catch(err) {

    console.error(err);
    return null;

  }

}

module.exports = verifyUser;