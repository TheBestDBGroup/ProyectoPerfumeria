const pool = require("../connectiondb");

const getOpcionesPagoProveedor = (request, response) => {
  
  let values = [request.body.id_proveedor];
  
  const query =
    "SELECT cond.id_condicion_pago,cond.tipo_condicion_pago, cond.cuotas_condicion_pago,\
    cond.prctj_cuotas_condicion_pago, cond.mesescantidad_condicion_pago \
    FROM ydm_condicion_pago cond WHERE id_proveedor_condicion_pago = $1;";
  
  pool.query(query,values,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getOpcionesEnvioProveedor = (request, response) => {
  
  let values = [request.body.id_proveedor];
  
  const query =
    "SELECT pais.nombre_pais, altenv.id_alt_envio, altenv.transporte_alt_envio,\
     altenv.costo_alt_envio, altenv.tiempo_estimado_alt_envio FROM ydm_alt_envio altenv,\
     ydm_pais pais WHERE altenv.id_proveedor_alt_envio = $1 and altenv.id_pais_alt_envio = pais.id_pais;";
  
  pool.query(query,values,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });

};






module.exports = {
  getOpcionesPagoProveedor,
  getOpcionesEnvioProveedor,
};
