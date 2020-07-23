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
  const text =
    "INSERT INTO ydm_contrato VALUES (DEFAULT, current_date, NULL, NULL, $1, $2, $3) RETURNING *;";
  const values = [
    request.body.exclusivo,
    request.body.id_productor,
    request.body.id_proveedor,
  ];
  pool.query(text, values, (error, results) => {
    if (error) {
      console.log("ERROR DE CREACIÓN DE CONTRATO: " + error);
      throw error;
    }
    response.status(201).send(results.rows);
  });
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

module.exports = {
  getOpcionesPagoProveedor,
  getOpcionesEnvioProveedor,
  postRenovarContrato,
  postCrearContrato,
  postCrearCondEnvPago,
  postCrearClausulaProd,
};
