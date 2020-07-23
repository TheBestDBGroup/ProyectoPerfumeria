const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");
const productorController = require("./controllers/productorController");
const contratoController = require("./controllers/contratoController");

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

router.get("/read/productores", productorController.getProductores); //OBTENER TODOS LOS PRODUCTORES

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

router.post("/create/renovacion", contratoController.postRenovarContrato); //RENOVAR CONTRATO
router.post("/create/contrato", contratoController.postCrearContrato); //CREAR CONTRATO
router.post("/create/cond-env-pago", contratoController.postCrearCondEnvPago); //CREAR COND ENV PAGO
router.post("/create/clausula-prod", contratoController.postCrearClausulaProd); //CREAR CLAUSULA PROD

//OBTENER PRODUCTOR
router.post("/read/productor", productorController.getProductor);
//OBTENER PROVEEDOR
router.post("/read/proveedor", proveedorController.getProveedor);

//OPCIONES ING ESEN SIN EXC
router.post("/read/opciones-proveedor/ing-esen-sin-exc", contratoController.postGetOpcionesIngredienteEsencia);

//OPCIONES ING ESEN CON EXC
router.post("/read/opciones-proveedor/ing-esen-con-exc", contratoController.postGetOpcionesIngredienteEsenciaExc);

//OPCIONES ING GEN SIN EXC
router.post("/read/opciones-proveedor/ing-gen-sin-exc", contratoController.postGetOpcionesIngredienteGeneral);

//OPCIONES ING GEN CON EXC
router.post("/read/opciones-proveedor/ing-gen-con-exc", contratoController.postGetOpcionesIngredienteGeneralExc);


module.exports = router;
