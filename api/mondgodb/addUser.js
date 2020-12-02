const bcrypt = require("bcryptjs");


const addUser = async (client, username, password) => {

  try {

    const db = await client.db("vault_db");
    const users = db.collection('users');
    const result = await users.insertOne({ 
      username,
      password: bcrypt.hashSync(password, 8),
      rating: null,
      wallet: null
     });

    await client.close();

    return result;

  } catch(err) {

    console.error(err);

  }

}

module.exports = addUser;