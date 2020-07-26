const pool = require("../connectiondb");

const getOpcionesPagoProveedor = (request, response) => {
  let values = [request.body.id_proveedor];

  const query =
    "SELECT cond.id_condicion_pago,cond.tipo_condicion_pago, cond.cuotas_condicion_pago,\
    cond.prctj_cuotas_condicion_pago, cond.mesescantidad_condicion_pago \
    FROM ydm_condicion_pago cond WHERE id_proveedor_condicion_pago = $1;";

  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getOpcionesEnvioProveedor = (request, response) => {
  let values = [request.body.id_proveedor];

  const query =
    "SELECT pais.nombre_pais, pais.id_pais, altenv.id_alt_envio, altenv.transporte_alt_envio,\
     altenv.costo_alt_envio, altenv.tiempo_estimado_alt_envio FROM ydm_alt_envio altenv,\
     ydm_pais pais WHERE altenv.id_proveedor_alt_envio = $1 and altenv.id_pais_alt_envio = pais.id_pais;";

  pool.query(query, values, (error, results) => {
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

const postCrearContrato = (request, response) => {
  console.log(request.body);
  exclusivo = request.body.exclusivo;
  id_productor = request.body.id_productor;
  id_proveedor = request.body.id_proveedor;

  let valuesAntiguoContrato = [id_productor, id_proveedor];
  const queryAntiguoContrato =
    "SELECT * FROM ydm_contrato c\
    WHERE id_productor_contrato = $1 AND id_proveedor_contrato = $2\
      AND fecha_cancela_contrato is null";
  pool.query(queryAntiguoContrato, valuesAntiguoContrato, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows != "") {
      id_contrato = results.rows[0].id_contrato;
    } else {
      id_contrato = null;
    }
    let valuesFinalizarContrato = [id_contrato];
    const queryFinalizarContrato =
      "UPDATE ydm_contrato c\
      SET fecha_cancela_contrato = current_date, motivo_cancela_contrato='Creación de nuevo contrato'\
      WHERE c.id_contrato = $1 RETURNING *";
    pool.query(queryFinalizarContrato, valuesFinalizarContrato, (error) => {
      if (error) {
        throw error;
      }
      const valuesCrearContrato = [
        request.body.exclusivo,
        request.body.id_productor,
        request.body.id_proveedor,
      ];
      const queryCrearContrato =
        "INSERT INTO ydm_contrato VALUES (DEFAULT, current_date, NULL, NULL, $1, $2, $3) RETURNING *;";
      pool.query(queryCrearContrato, valuesCrearContrato, (error, results) => {
        if (error) {
          console.log("ERROR DE CREACIÓN DE CONTRATO: " + error);
          throw error;
        }
        response.status(201).send(results.rows);
      });
    });
  });
};

const postCancelarContrato = (request, response) => {
  console.log(request.body);
  let valuesCancelarContrato = [
    request.body.motivo_cancela,
    request.body.id_contrato,
  ];
  const queryCancelarContrato =
    "UPDATE ydm_contrato c SET fecha_cancela_contrato = current_date, motivo_cancela_contrato = $1\
    WHERE c.id_contrato = $2 RETURNING *";
  pool.query(
    queryCancelarContrato,
    valuesCancelarContrato,
    (error, results) => {
      if (error) {
        console.log("ERROR AL CANCELAR CONTRATO: " + error);
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const postCrearCondEnvPago = (request, response) => {
  console.log(request.body);
  const text =
    "INSERT INTO ydm_cond_env_pago VALUES (DEFAULT, $1, null, $3, $2, $4, $2, $5) RETURNING *";
  const values = [
    request.body.id_contrato,
    request.body.id_proveedor,
    request.body.id_condicion_pago,
    request.body.id_alt_envio,
    request.body.id_pais_alt_envio,
  ];
  pool.query(text, values, (error, results) => {
    if (error) {
      console.log("ERROR DE CREACIÓN DE COND ENV PAGO: " + error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const postCrearClausulaProd = (request, response) => {
  console.log(request.body);
  const text =
    "INSERT INTO ydm_clausula_prod VALUES (DEFAULT, $1, $2, $3) RETURNING *";
  const values = [
    request.body.id_contrato,
    request.body.id_ingr_esencia,
    request.body.id_ingr_general,
  ];
  pool.query(text, values, (error, results) => {
    if (error) {
      console.log("ERROR DE CREACIÓN DE COND ENV PAGO: " + error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const postGetOpcionesIngredienteGeneralExc = (request, response) => {
  console.log(request.body);

  let text =
    "SELECT DISTINCT ydm_contrato.exclusivo_contrato, \
     ydm_ingrediente_general.cas_ingrediente_general, \
     ydm_ingrediente_general.nombre_ingrediente_general,\
     ydm_ingrediente_general.id_ingrediente_general\
     FROM ydm_contrato \
     INNER JOIN  ydm_clausula_prod \
     on ydm_contrato.id_contrato = ydm_clausula_prod.id_contrato_clausula_prod\
     INNER JOIN ydm_ingrediente_general\
     on ydm_clausula_prod.id_ingr_general_clausula_prod = ydm_ingrediente_general.id_ingrediente_general\
     INNER JOIN ydm_proveedor\
     on ydm_ingrediente_general.id_proveedor_ingrediente_general = ydm_proveedor.id_proveedor\
     WHERE ydm_proveedor.id_proveedor = $1 AND ydm_contrato.exclusivo_contrato = false";

  const values = [request.body.id_proveedor];

  pool.query(text, values, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const postGetOpcionesIngredienteGeneral = (request, response) => {
  console.log(request.body);

  let text =
    "SELECT ig.id_ingrediente_general, ig.nombre_ingrediente_general,\
  ig.cas_ingrediente_general\
  from ydm_ingrediente_general ig\
  WHERE ig.id_ingrediente_general NOT IN (SELECT DISTINCT cp.id_ingr_general_clausula_prod FROM ydm_clausula_prod cp)\
  OR ig.id_ingrediente_general NOT IN (SELECT DISTINCT cp.id_ingr_general_clausula_prod FROM ydm_clausula_prod cp) IS UNKNOWN";

  pool.query(text, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const postGetOpcionesIngredienteEsencia = (request, response) => {
  console.log(request.body);

  let text =
    "SELECT * from ydm_ingrediente_esencia ig\
  WHERE ig.id_ingrediente_esencia NOT IN \
  (SELECT DISTINCT cp.id_ingr_esencia_clausula_prod FROM ydm_clausula_prod cp)\
  OR ig.id_ingrediente_esencia NOT IN \
  (SELECT DISTINCT cp.id_ingr_esencia_clausula_prod FROM ydm_clausula_prod cp)\
  IS UNKNOWN";

  pool.query(text, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const postGetOpcionesIngredienteEsenciaExc = (request, response) => {
  console.log(request.body);

  let text =
    "SELECT DISTINCT ydm_contrato.exclusivo_contrato,\
  ydm_ingrediente_esencia.cas_ingrediente_esencia,\
  ydm_ingrediente_esencia.nombre_ingrediente_esencia,\
  ydm_ingrediente_esencia.id_ingrediente_esencia\
  FROM ydm_contrato\
  INNER JOIN  ydm_clausula_prod\
  on ydm_contrato.id_contrato = ydm_clausula_prod.id_contrato_clausula_prod\
  INNER JOIN ydm_ingrediente_esencia\
  on ydm_clausula_prod.id_ingr_esencia_clausula_prod = ydm_ingrediente_esencia.id_ingrediente_esencia\
  INNER JOIN ydm_proveedor\
  on ydm_ingrediente_esencia.id_proveedor_ingrediente_esencia = ydm_proveedor.id_proveedor\
  WHERE ydm_proveedor.id_proveedor = $1 AND ydm_contrato.exclusivo_contrato = false";

  const values = [request.body.id_proveedor];

  pool.query(text, values, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

module.exports = {
  getOpcionesPagoProveedor,
  getOpcionesEnvioProveedor,
  postRenovarContrato,
  postCrearContrato,
  postCancelarContrato,
  postCrearCondEnvPago,
  postCrearClausulaProd,
  postGetOpcionesIngredienteEsenciaExc,
  postGetOpcionesIngredienteEsencia,
  postGetOpcionesIngredienteGeneral,
  postGetOpcionesIngredienteGeneralExc,
};
