const knex = require("knex");
require("dotenv").config();

module.exports = {
  db: knex({
    client: "pg",
    connection: process.env.PGCONNECTIONURI,
    ssl: { rejectUnauthorized: false }, // Ensure SSL is properly configured for Render
  }),
};