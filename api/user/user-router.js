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
