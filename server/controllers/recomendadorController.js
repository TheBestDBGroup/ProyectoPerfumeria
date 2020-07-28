const pool = require("../connectiondb");

const getPerfumesFamiliaOlfativa = (request, response) => {
  valuesPerfumesFamiliaOlfativa = [
    request.body.verde,
    request.body.citrico,
    request.body.flores,
    request.body.frutas,
    request.body.aromaticos,
    request.body.helechos,
    request.body.chipre,
    request.body.maderas,
    request.body.orientales,
    request.body.otros,
  ];
  pool.query(
    "SELECT pe.nombre_perfume, fo.nombre_familia_olfativa from ydm_perfume pe , ydm_familia_olfativa fo, ydm_principal pr\
  WHERE pe.id_perfume = pr.id_perfume_principal AND fo.id_familia_olfativa = pr.id_familia_olfativa_principal\
  AND (fo.nombre_familia_olfativa = $1 OR fo.nombre_familia_olfativa = $2 OR fo.nombre_familia_olfativa = $3\
    OR fo.nombre_familia_olfativa = $4 OR fo.nombre_familia_olfativa = $5 OR fo.nombre_familia_olfativa = $6\
    OR fo.nombre_familia_olfativa = $7 OR fo.nombre_familia_olfativa = $8 OR fo.nombre_familia_olfativa = $9\
    OR fo.nombre_familia_olfativa = $10)",
    valuesPerfumesFamiliaOlfativa,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = { getPerfumesFamiliaOlfativa };
