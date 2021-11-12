exports.seed = function(knex, Promise) {
  return knex('users')
    .truncate()
    .then(function (){
      return knex('users').insert([
        { username: "foobar", password: "foo12" },
      ])
    })
};