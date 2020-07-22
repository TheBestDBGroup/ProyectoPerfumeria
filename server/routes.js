const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");
const productorController = require("./controllers/productorController");
const contratoController = require("./controllers/contratoController")

router.get("/ping", (req, res) => {
  return res.send("pong");
}); //TEST


router.post("/read/proveedores", proveedorController.getProveedores); //OBTENER TODOS LOS PROVEEDORES
router.post(
  "/read/proveedores-potenciales",
  proveedorController.getProveedoresPotenciales
); //OBTENER TODOS LOS PROVEEDORES POTENCIALES
router.post(
  "/read/proveedores-por-renovar",
  proveedorController.getProveedoresPorRenovar
); //OBTENER PROVEEDORES POR RENOVAR

//OBTENER TODOS LOS PRODUCTORES
router.get("/read/productores", productorController.getProductores);

//OBTENER LAS OPCIONES DE CONTRATO DE UN PROVEEDOR
router.post("/read/contrato/opciones-proveedor/pago",contratoController.getOpcionesPagoProveedor); 
router.post("/read/contrato/opciones-proveedor/envio",contratoController.getOpcionesEnvioProveedor);


module.exports = router;
