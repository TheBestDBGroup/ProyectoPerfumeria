const pool = require("../connectiondb");

const getProveedores = (request, response) => {
  pool.query("SELECT * FROM ydm_proveedor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProveedoresPotenciales = (request, response) => {
  let values = [request.body.id_productor];
  const query =
    "SELECT DISTINCT id_proveedor, nombre_proveedor, web_proveedor, email_proveedor, nombre_pais\
  FROM ydm_pi_pdt_env, ydm_alt_envio, ydm_proveedor, ydm_pais, ydm_miembro_ifra\
  WHERE id_productor_pi_pdt_env = $1\
    AND id_pais_pi_pdt_env = id_pais_alt_envio\
    AND id_pais_pi_pdt_env = id_pais\
    AND id_proveedor_alt_envio = id_proveedor\
    AND id_proveedor = id_proveedor_miembro_ifra\
    AND fecha_exclusion_miembro_ifra is null";
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
    "SELECT id_proveedor, nombre_proveedor, web_proveedor, email_proveedor, id_contrato, fecha_emision_contrato, (\
			SELECT fecha_renueva FROM ydm_renueva r\
			WHERE fecha_renueva + 365 BETWEEN current_date AND current_date + 30\
        AND id_contrato_renueva = cont.id_contrato ORDER BY fecha_renueva desc LIMIT 1 ), nombre_pais\
    FROM ydm_proveedor prov, ydm_contrato cont, ydm_productor, ydm_pais WHERE id_productor = $1\
    AND id_productor = id_productor_contrato AND id_proveedor = id_proveedor_contrato\
    AND id_pais = id_pais_proveedor AND fecha_cancela_contrato is null\
    AND	(fecha_emision_contrato + 365 BETWEEN current_date AND current_date + 30\
      OR (SELECT fecha_renueva FROM ydm_renueva r\
        WHERE fecha_renueva + 365 BETWEEN current_date AND current_date + 30\
        AND id_contrato_renueva = cont.id_contrato ORDER BY fecha_renueva desc LIMIT 1 ) + 365\
        BETWEEN current_date AND current_date + 30)";
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getProveedores,
  getProveedoresPotenciales,
  getProveedoresPorRenovar,
};
