const pool = require("../connectiondb");

const getIngrEsenciaNoExclusivos = (request, response) => {
  let values = [request.body.id_proveedor];
  const query =
    "SELECT con.id_contrato, con.exclusivo_contrato, ie.cas_ingrediente_esencia, ie.nombre_ingrediente_esencia,\
                  ie.id_ingrediente_esencia, pre.precio_presentacion, pre.volumen_presentacion\
                FROM ydm_contrato con, ydm_clausula_prod cp, ydm_ingrediente_esencia ie, ydm_presentacion pre, ydm_proveedor prov\
                WHERE con.id_contrato = cp.id_contrato_clausula_prod\
                  AND cp.id_ingr_esencia_clausula_prod = ie.id_ingrediente_esencia\
                  AND ie.id_ingrediente_esencia= pre.id_ingr_esencia_presentacion\
                  AND ie.id_proveedor_ingrediente_esencia = prov.id_proveedor\
                  AND prov.id_proveedor = $1 AND con.exclusivo_contrato = false\
                ORDER BY con.id_contrato, ie.nombre_ingrediente_esencia";
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getIngrGeneralesNoExclusivos = (request, response) => {
  let values = [request.body.id_proveedor];
  const query =
    "SELECT con.id_contrato, con.exclusivo_contrato, ig.cas_ingrediente_general, ig.nombre_ingrediente_general,\
                  ig.id_ingrediente_general, pre.precio_presentacion, pre.volumen_presentacion\
                FROM ydm_contrato con, ydm_clausula_prod cp, ydm_ingrediente_general ig, ydm_presentacion pre, ydm_proveedor prov\
                WHERE con.id_contrato = cp.id_contrato_clausula_prod\
                  AND cp.id_ingr_general_clausula_prod = ig.id_ingrediente_general\
                  AND ig.id_ingrediente_general= pre.id_ingr_general_presentacion\
                  AND ig.id_proveedor_ingrediente_general = prov.id_proveedor\
                  AND prov.id_proveedor = $1 AND con.exclusivo_contrato = false\
                ORDER BY con.id_contrato, ig.nombre_ingrediente_general";
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProveedoresPorRenovar = (request, response) => {
  let values = [request.body.id_productor];
  const query =
    "SELECT id_proveedor, nombre_proveedor, web_proveedor, email_proveedor, nombre_pais as pais_proveedor, id_contrato, fecha_emision_contrato, (\
			SELECT fecha_renueva FROM ydm_renueva\
      WHERE id_contrato_renueva = cont.id_contrato ORDER BY fecha_renueva desc LIMIT 1)\
    FROM ydm_proveedor prov, ydm_contrato cont, ydm_productor, ydm_pais\
    WHERE id_productor = $1 AND id_productor = id_productor_contrato AND id_proveedor = id_proveedor_contrato\
    AND id_pais = id_pais_proveedor AND fecha_cancela_contrato is null AND	fecha_emision_contrato + 365 BETWEEN current_date AND current_date + 30\
	  AND (SELECT fecha_renueva FROM ydm_renueva\
		    WHERE fecha_renueva BETWEEN current_date - 365 AND current_date AND id_contrato_renueva = cont.id_contrato\
    ORDER BY fecha_renueva desc LIMIT 1) IS null\
 UNION \
SELECT id_proveedor, nombre_proveedor, web_proveedor, email_proveedor, nombre_pais as pais_proveedor, id_contrato, fecha_emision_contrato, (\
			SELECT fecha_renueva FROM ydm_renueva\
			WHERE id_contrato_renueva = cont.id_contrato ORDER BY fecha_renueva desc LIMIT 1)\
    FROM ydm_proveedor prov, ydm_contrato cont, ydm_productor, ydm_pais\
    WHERE id_productor = $1 AND id_productor = id_productor_contrato AND id_proveedor = id_proveedor_contrato AND id_pais = id_pais_proveedor\
      AND fecha_cancela_contrato is null AND\
        (SELECT fecha_renueva FROM ydm_renueva\
          WHERE fecha_renueva BETWEEN current_date AND current_date + 30\
            AND id_contrato_renueva = cont.id_contrato\
          ORDER BY fecha_renueva desc LIMIT 1) + 365 BETWEEN current_date AND current_date + 30";
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getIngrEsenciaNoExclusivos,
  getIngrGeneralesNoExclusivos,
  getProveedoresPorRenovar,
};
