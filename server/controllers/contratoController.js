const pool = require("../connectiondb");

const getOpcionesContratoProveedor = (request, response) => {
  pool.query("SELECT * FROM ydm_productor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const postRenovarContrato = (request, response) => {
  console.log(request.body);
  const text =
    "INSERT INTO ydm_renueva(id_renueva, id_contrato_renueva, fecha_renueva) VALUES (DEFAULT, $1, current_date) RETURNING *";
  const values = [request.body.id_contrato];
  pool.query(text, values, (error, results) => {
    if (error) {
      console.log("ERROR DE RENOVACIÓN DE CONTRATO: " + error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

module.exports = {
  getOpcionesContratoProveedor,
  postRenovarContrato,
};
