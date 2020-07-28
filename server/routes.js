const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");
const productorController = require("./controllers/productorController");
const contratoController = require("./controllers/contratoController");
const evaluacionController = require("./controllers/evaluacionController");
const pedidoController = require("./controllers/pedidoController");
const recomendadorController = require("./controllers/recomendadorController");

router.get("/ping", (req, res) => {
  return res.send("pong");
}); //TEST

router.post("/read/proveedores", proveedorController.getProveedores); //OBTENER TODOS LOS PROVEEDORES
router.post(
  //OBTENER TODOS LOS PROVEEDORES POTENCIALES
  "/read/proveedores-potenciales",
  proveedorController.getProveedoresPotenciales
);
router.post(
  //OBTENER PROVEEDORES POR RENOVAR
  "/read/proveedores-por-renovar",
  proveedorController.getProveedoresPorRenovar
);

//OBTENER TODOS LOS PRODUCTORES
router.get("/read/productores", productorController.getProductores);

//OBTENER LAS OPCIONES DE CONTRATO DE UN PROVEEDOR
router.post(
  "/read/contrato/opciones-proveedor/pago",
  contratoController.getOpcionesPagoProveedor
);
router.post(
  "/read/contrato/opciones-proveedor/envio",
  contratoController.getOpcionesEnvioProveedor
);

//OBTENER LOS INGREDIENTE ESENCIA  DE UN CONTRATO
router.post(
  "/read/contrato/ingrediente-esencia",
  contratoController.getIngredientesEsenciaContrato
);
//OBTENER LOS INGREDIENTE INGREDIENTE GENERAL DE UN CONTRATO
router.post(
  "/read/contrato/ingrediente-general",
  contratoController.getIngredientesGeneralContrato
);

//OBTENER ALTERNATIVAS DE ENVIOS DE UN CONTRATO
router.post(
  "/read/contrato/alternativa-envios",
  contratoController.getAlternativasEnviosContrato
);

//OBTENER CONDICIONES DE PAGO DE UN CONTRATO
router.post(
  "/read/contrato/condiciones-pago-contrato",
  contratoController.getCondicionPagoContrato
);

//OBTENER  VIGENTES DE UN PROVEEDOR
router.post(
  "/read/contratos-vigentes",
  contratoController.getContratosVigentes
);

router.post("/create/renovacion", contratoController.postRenovarContrato); //RENOVAR CONTRATO
router.post("/create/contrato", contratoController.postCrearContrato); //CREAR CONTRATO
router.post(
  "/update/cancelar-contrato",
  contratoController.postCancelarContrato
); //CANCERLAR CONTRATO
router.post("/create/cond-env-pago", contratoController.postCrearCondEnvPago); //CREAR COND ENV PAGO
router.post("/create/clausula-prod", contratoController.postCrearClausulaProd); //CREAR CLAUSULA PROD

//OBTENER PRODUCTOR
router.post("/read/productor", productorController.getProductor);
//OBTENER PROVEEDOR
router.post("/read/proveedor", proveedorController.getProveedor);

//OPCIONES ING ESEN SIN EXC
router.post(
  "/read/opciones-proveedor/ing-esen-sin-exc",
  contratoController.postGetOpcionesIngredienteEsencia
);

//OPCIONES ING ESEN CON EXC
router.post(
  "/read/opciones-proveedor/ing-esen-con-exc",
  contratoController.postGetOpcionesIngredienteEsenciaExc
);

//OPCIONES ING GEN SIN EXC
router.post(
  "/read/opciones-proveedor/ing-gen-sin-exc",
  contratoController.postGetOpcionesIngredienteGeneral
);

//OPCIONES ING GEN CON EXC
router.post(
  "/read/opciones-proveedor/ing-gen-con-exc",
  contratoController.postGetOpcionesIngredienteGeneralExc
);

//OBTENER CRITERIOS DE EVALUACION
router.post(
  "/read/criterios-evaluacion",
  evaluacionController.getCriteriosEvaluacion
);

//CREAR UN CRITERIO DE EVALUACION
router.post("/create/eval-crit", evaluacionController.postCrearEvalCrit);
//FINALIZAR CRITERIOS DE EVALUACION
router.post(
  "/create/finalizar-eval-crits",
  evaluacionController.postFinalizarEvalCrits
);

//CREAR UNA ESCALA
router.post("/create/escala", evaluacionController.postCrearEscala);

//GET ESCALA
router.post("/read/escala", evaluacionController.getEscala);

//GET EVAL CRITS
router.post("/read/eval-crits", evaluacionController.getEvalCrits);

//CREAR EVALUACION
router.post("/create/evaluacion", evaluacionController.postCrearEvaluacion);

//VALIDAR EVALUACION
router.post(
  "/read/validar-evaluacion",
  evaluacionController.getValidarEvaluacion
);

//GET PRODUCTORES CON CONTRATOS VIGENTES
router.post(
  "/read/proveedores-con-contratos-vigentes",
  proveedorController.getProveedoresConContratosVigentes
);

//CREAR PEDIDO
router.post("/create/pedido", pedidoController.postCrearPedido);
//CREAR DETALLE PEDIDO
router.post("/create/detalle-pedido", pedidoController.postCrearDetallePedido);
//CREAR RECHAZAR PEDIDO
router.post("/update/rechazar-pedido", pedidoController.postRechazarPedido);

//GUARDAR ALT ENVIO EN PEDIDO//
router.post(
  "/update/guardar-alt-env/cond-env-pago",
  pedidoController.postGuardarAltEnvCondEnvPago
);
//GUARDAR COND PAGO EN PEDIDO
router.post(
  "/update/guardar-condicion-pago/cond-env-pago",
  pedidoController.postGuardarCondPagoCondEnvPago
);

//OBTENER PEDIDOS CONDIRMADOS DE PRODUCTOR
router.post(
  "/read/pedido/pedidos-confirmado-productor",
  pedidoController.getPedidoConfirmadoProductor
);

//OBTENER PEDIDOS  DE PRODUCTOR
router.post(
  "/read/pedido/pedidos-productor",
  pedidoController.getPedidosProductor
);
//OBTENER PEDIDOS POR CONFIRMAR DE PORVEEDOR
router.post(
  "/read/pedido/pedidos-por-confirmar-proveedor",
  pedidoController.getPedidoPorConfirmarProveedor
);
//OBTENER PAGOS DE UN PEDIDO
router.post("/read/pedido/pago-pedido", pedidoController.getPedidoPago);

//CREAR PAGO DE CONTADO
router.post("/create/pago-contado", pedidoController.postCrearPagoContado);
//CREAR PAGO DE CRÉDITO
router.post("/create/pago-credito", pedidoController.postCrearPagoCredito);

//UPDATE MONTO PEDIDO
router.post("/update/monto-de-pedido", pedidoController.guardarMontoPedido);

//OBTENER PERFUMES POR FAMILIA OLFATIVA
router.post(
  "/read/perfumes-recomendador",
  recomendadorController.getPerfumesRecomendador
);

module.exports = router;
