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
router.post("/read/contrato/opciones-proveedor/pago",contratoController.getOpcionesPagoProveedor); 
router.post("/read/contrato/opciones-proveedor/envio",contratoController.getOpcionesEnvioProveedor);

router.post("/create/renovacion", contratoController.postRenovarContrato); //RENOVAR CONTRATO

module.exports = router;
