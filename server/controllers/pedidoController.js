const pool = require("../connectiondb");

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

const postGuardarCondEnvPago = (request, response) => {
  console.log(request.body);
  const valuesGuardarCondEnvPago = [
    request.body.id_pedido,
    request.body.id_cond_env_pago,
  ];
  const queryGuardarCondEnvPago =
    "UPDATE ydm_pedido pd\
    SET (id_alt_env_cond_env_pago_pedido, id_contrato_cond_env_pago_pedido) =\
    (SELECT id_alt_envio_cond_env_pago , id_contrato_cond_env_pago\
      FROM ydm_cond_env_pago WHERE id_cond_env_pago = $2)\
      WHERE pd.id_pedido = $1 RETURNING *";

  pool.query(
    queryGuardarCondEnvPago,
    valuesGuardarCondEnvPago,
    (error, results) => {
      if (error) {
        console.log("ERROR GUARDAR COND ENV PAGO: " + error);
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};

module.exports = {
  postCrearPedido,
  postCrearDetallePedido,
  postGuardarCondEnvPago,
};
