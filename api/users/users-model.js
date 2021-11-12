const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  findBy,
  add,
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

function findBy(filter) {
  return db("users").where("username", filter)
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}
