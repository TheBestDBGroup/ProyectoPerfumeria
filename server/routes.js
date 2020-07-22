const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");
//const productorController = require("./controllers/productorController")
const productorController = require("./controllers/productorController");

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

router.get("/read/productores", productorController.getProductores);//OBTENER TODOS LOS PRODUCTORES

module.exports = router;
