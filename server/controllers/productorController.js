const pool = require("../connectiondb");

const getProductores = (request, response) => {
  pool.query("SELECT * FROM ydm_productor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductor = (request, response) => {
  let values = [request.body.id_productor]
  pool.query("SELECT * FROM ydm_productor WHERE id_productor= $1",values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};




module.exports = {
  getProductores,
  getProductor,
};
