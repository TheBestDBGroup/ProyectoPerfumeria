const { Pool } = require("pg");
const config = require("./config");

//PostgreSQL database configuration

const pool = new Pool(config);
pool
  .connect()
  .then((response) => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB is not connected");
    pool.end();
  });

module.exports = pool;
