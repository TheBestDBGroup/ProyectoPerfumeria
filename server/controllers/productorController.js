const pool = require("../connectiondb");

const getProductores = (request, response) => {
  pool.query("SELECT * FROM ydm_productor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



module.exports = {
  getProductores,
};
