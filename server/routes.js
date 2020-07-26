const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");
const productorController = require("./controllers/productorController");
const contratoController = require("./controllers/contratoController");
const evaluacionController = require("./controllers/evaluacionController");

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

//OBTENER CONTRATOS VIGENTES DE UN PROVEEDOR
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

//CREAR UNA ESCALA
router.post("/create/escala", evaluacionController.postCrearEscala);

//GET ESCALA
router.post("/read/escala",evaluacionController.getEscala);

//GET EVAL CRITS
router.post("/read/eval-crits",evaluacionController.getEvalCrits);

//CREAR EVALUACION
router.post("/create/evaluacion", evaluacionController.postCrearEvaluacion);

//VALIDAR EVALUACION
router.post(
  "/read/validar-evaluacion",
  evaluacionController.getValidarEvaluacion
);

module.exports = router;
