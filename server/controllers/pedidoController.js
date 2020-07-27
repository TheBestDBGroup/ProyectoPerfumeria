const pool = require("../connectiondb");
const moment = require("moment");

const postCrearPedido = (request, response) => {
  console.log(request.body);
  const valuesCrearPedido = [
    request.body.id_proveedor,
    request.body.id_productor,
  ];
  const queryCrearPedido =
    "INSERT INTO ydm_pedido(id_pedido, fecha_pedido, estatus_pedido, id_proveedor_pedido, id_productor_pedido)\
    VALUES (DEFAULT, current_date, 'Por confirmar', $1, $2) RETURNING *";

  pool.query(queryCrearPedido, valuesCrearPedido, (error, results) => {
    if (error) {
      console.log("ERROR CREAR PEDIDO: " + error);
      throw error;
    }
    response.status(201).send(results.rows[0].id_pedido);
  });
};

const postCrearDetallePedido = (request, response) => {
  console.log(request.body);
  const valuesCrearDetallePedido = [
    request.body.id_presentacion,
    request.body.id_pedido,
    request.body.cantidad,
  ];
  const queryCrearDetallePedido =
    "INSERT INTO ydm_detalle_pedido VALUES (DEFAULT, $1, $2, $3) RETURNING *";

  pool.query(
    queryCrearDetallePedido,
    valuesCrearDetallePedido,
    (error, results) => {
      if (error) {
        console.log("ERROR CREAR PEDIDO: " + error);
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};

const postGuardarAltEnvCondEnvPago = (request, response) => {
  console.log(request.body);
  const valuesGuardarAltEnvCondEnvPago = [
    request.body.id_pedido,
    request.body.id_cond_env_pago,
  ];
  const queryGuardarAltEnvCondEnvPago =
    "UPDATE ydm_pedido pd\
    SET (id_alt_env_cond_env_pago_pedido, id_contrato_alt_env_cond_env_pago_pedido) =\
    (SELECT id_alt_envio_cond_env_pago , id_contrato_cond_env_pago\
      FROM ydm_cond_env_pago WHERE id_cond_env_pago = $2)\
      WHERE pd.id_pedido = $1 RETURNING *";

  pool.query(
    queryGuardarAltEnvCondEnvPago,
    valuesGuardarAltEnvCondEnvPago,
    (error, results) => {
      if (error) {
        console.log("ERROR GUARDAR COND ENV PAGO: " + error);
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};

const postGuardarCondPagoCondEnvPago = (request, response) => {
  console.log(request.body);
  const valuesGuardarCondPagoCondEnvPago = [
    request.body.id_pedido,
    request.body.id_cond_env_pago,
  ];
  const queryGuardarCondPagoCondEnvPago =
    "UPDATE ydm_pedido pd\
    SET (id_condicion_pago_cond_env_pago_pedido, id_contrato_condicion_pago_cond_env_pago_pedido) =\
    (SELECT id_condicion_pago_cond_env_pago , id_contrato_cond_env_pago\
      FROM ydm_cond_env_pago WHERE id_cond_env_pago = $2)\
      WHERE pd.id_pedido = $1 RETURNING *";

  pool.query(
    queryGuardarCondPagoCondEnvPago,
    valuesGuardarCondPagoCondEnvPago,
    (error, results) => {
      if (error) {
        console.log("ERROR GUARDAR COND ENV PAGO: " + error);
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};

const postCrearPagoContado = (request, response) => {
  console.log(request.body);
  let valuesCrearPagoContado = [
    request.body.id_pedido,
    request.body.monto_pedido,
  ];
  const queryCrearPagoContado =
    "INSERT INTO ydm_pago VALUES(DEFAULT,$1, current_date, $2)";
  pool.query(
    queryCrearPagoContado,
    valuesCrearPagoContado,
    (error, results) => {
      if (error) {
        console.log("ERROR PAGO CONTADO: " + error);
        throw error;
      }
      let valuesConfirmarPedido = [
        request.body.id_pedido,
        request.body.monto_pedido,
      ];
      const queryConfirmarPedido =
        "UPDATE ydm_pedido SET monto_pedido = $2,\
        estatus_pedido = 'Confirmado', fecha_confirmacion_pedido = current_date\
        WHERE id_pedido = $1";
      pool.query(
        queryConfirmarPedido,
        valuesConfirmarPedido,
        (error, results) => {
          if (error) {
            console.log("ERROR CONFIRMAR PEDIDO: " + error);
            throw error;
          }
          response.status(201).send("ok");
        }
      );
    }
  );
};

const postCrearPagoCredito = (request, response) => {
  console.log(request.body);
  let suma_fecha = moment()
    .add(request.body.num_cuota * request.body.meses_cantidad, "months")
    .calendar();
  suma_fecha = moment(suma_fecha);
  let suma_monto =
    (request.body.monto_pedido * request.body.porcentaje_cuotas) / 100;
  let valuesCrearPagoCredito = [request.body.id_pedido, suma_fecha, suma_monto];
  const queryCrearPagoCredito =
    "INSERT INTO ydm_pago VALUES(DEFAULT,$1, $2, $3) RETURNING *";
  pool.query(
    queryCrearPagoCredito,
    valuesCrearPagoCredito,
    (error, results) => {
      if (error) {
        console.log("ERROR PAGO CREDITO: " + error);
        throw error;
      }
      let valuesConfirmarPedido = [
        request.body.id_pedido,
        request.body.monto_pedido,
      ];
      const queryConfirmarPedido =
        "UPDATE ydm_pedido SET monto_pedido = $2,\
        estatus_pedido = 'Confirmado', fecha_confirmacion_pedido = current_date\
        WHERE id_pedido = $1";
      pool.query(
        queryConfirmarPedido,
        valuesConfirmarPedido,
        (error, results) => {
          if (error) {
            console.log("ERROR CONFIRMAR PEDIDO: " + error);
            throw error;
          }
          response.status(201).send("ok");
        }
      );
    }
  );
};

const postRechazarPedido = (request, response) => {
  console.log(request.body);
  let valuesRechazarPedido = [
    request.body.id_pedido,
    request.body.tipo_cancela,
  ];
  const queryRechazarPedido =
    "UPDATE ydm_pedido SET estatus_pedido = $2\
  WHERE id_pedido = $1 RETURNING *";

  pool.query(queryRechazarPedido, valuesRechazarPedido, (error, results) => {
    if (error) {
      console.log("ERROR GUARDAR COND ENV PAGO: " + error);
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  postCrearPedido,
  postCrearDetallePedido,
  postGuardarAltEnvCondEnvPago,
  postGuardarCondPagoCondEnvPago,
  postCrearPagoContado,
  postCrearPagoCredito,
  postRechazarPedido,
};
