const getUserInfo = async (client, username) => {

  try {

    const db = await client.db("vault_db");
    const users = db.collection('users');

    const result = await users.find({ username }).toArray()

    await client.close();

    return result;

  } catch(err) {

    console.error(err);

  }

}

module.exports = getUserInfo;