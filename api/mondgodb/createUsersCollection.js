const createUsersCollection = async (client) => {

  try {

    const db = await client.db("vault_db");
    const collections = await db.listCollections().toArray();

    if (collections[0].name !== 'users') {
      await db.createCollection("users");
    }

    await client.close();

  } catch(err) {

    console.error(err);

  }

}

module.exports = createUsersCollection;