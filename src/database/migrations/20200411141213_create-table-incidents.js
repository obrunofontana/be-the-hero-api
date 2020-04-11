
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(t) {
    // Attributes
    t.increments();
    t.string('title').notNullable();
    t.string('description').notNullable();
    t.decimal('value').notNullable();

    // Relanshionships
    t.string('ong_id').notNullable();
    t.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
