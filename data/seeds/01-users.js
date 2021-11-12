exports.seed = function(knex) {
  return knex('users').insert([
    { username: "foobar", password: "foo12" },
  ]);
};