const pool = require("../connectiondb");

const getProveedores = (request, response) => {
  pool.query("SELECT * FROM ydm_proveedor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProveedor = (request, response) => {
  let values = [request.body.id_proveedor];
  pool.query(
    "SELECT * FROM ydm_proveedor WHERE id_proveedor = $1",
    values,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getProveedoresConContratosVigentes = (request, response) => {
  console.log(request.body);
  let values = [request.body.id_productor];
  const query =
    "SELECT ct.id_contrato, ct.fecha_emision_contrato, pro.id_proveedor, pro.nombre_proveedor,\
    pro.web_proveedor, pro.email_proveedor FROM ydm_contrato ct INNER JOIN ydm_proveedor pro\
    ON ct.id_proveedor_contrato=pro.id_proveedor WHERE ct.id_productor_contrato = $1\
    AND ct.fecha_cancela_contrato IS null AND (ct.fecha_emision_contrato + 365 >= current_date\
      OR ct.id_contrato = (SELECT id_contrato_renueva FROM ydm_renueva r\
        WHERE r.id_contrato_renueva = ct.id_contrato\
        AND r.fecha_renueva + 365 >= current_date\
        ORDER BY r.fecha_renueva desc LIMIT 1));";
  
    pool.query(query,values,(error, results) => {
      if (error) {
        console.log("ERROR DE PROV CONTRATOS VIGENTES: " + error);
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getProveedoresPotenciales = (request, response) => {
  let values = [request.body.id_productor];
  const query =
    "SELECT DISTINCT id_proveedor, nombre_proveedor, web_proveedor, email_proveedor, nombre_pais as pais_envio\
    FROM ydm_pi_pdt_env, ydm_alt_envio, ydm_proveedor, ydm_pais, ydm_miembro_ifra\
    WHERE id_productor_pi_pdt_env = $1\
      AND id_pais_pi_pdt_env = id_pais_alt_envio AND id_pais_pi_pdt_env = id_pais\
      AND id_proveedor_alt_envio = id_proveedor AND id_proveedor = id_proveedor_miembro_ifra\
    AND id_proveedor NOT IN (\
      SELECT DISTINCT id_proveedor_contrato from ydm_contrato, ydm_renueva\
      WHERE id_productor_contrato = $1\
      AND ((fecha_emision_contrato + 365 > current_date AND fecha_cancela_contrato is null)\
      OR (id_contrato IN (SELECT id_contrato_renueva from ydm_renueva where fecha_renueva + 365 > current_date)))\
      ) AND fecha_exclusion_miembro_ifra is null";
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
          WHERE (fecha_renueva BETWEEN current_date AND current_date + 30\
            OR fecha_renueva + 365 BETWEEN current_date AND current_date + 30)\
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
  getProveedores,
  getProveedoresPotenciales,
  getProveedoresPorRenovar,
  getProveedor,
  getProveedoresConContratosVigentes,
};
