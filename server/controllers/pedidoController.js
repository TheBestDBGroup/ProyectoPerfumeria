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

module.exports = {
  postCrearPedido,
  postCrearDetallePedido,
};
