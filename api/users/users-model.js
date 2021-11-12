const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
