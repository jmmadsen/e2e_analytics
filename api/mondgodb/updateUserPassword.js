const bcrypt = require("bcryptjs");


const updateUserPassword = async (client, username, newPassword) => {

  try {

    const db = await client.db("vault_db");
    const users = db.collection('users');
    const result = await users.updateOne(
      {
        username
      },
      { 
        $set: { password: bcrypt.hashSync(newPassword, 8) }
      });

    await client.close();

    return result;

  } catch(err) {

    console.error(err);
    return null;

  }

}

module.exports = updateUserPassword;