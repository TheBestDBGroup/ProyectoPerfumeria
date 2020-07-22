const express = require("express");
const router = express.Router();
const proveedorController = require("./controllers/proveedorController");

router.get("/ping", (req, res) => {
  return res.send("pong");
}); //TEST


router.get("/read/proveedores", proveedorController.getProveedores); //OBTENER TODOS LOS PROVEEDORES
router.get(
  "/read/proveedores-potenciales",
  proveedorController.getProveedoresPotenciales
); //OBTENER TODOS LOS PROVEEDORES POTENCIALES
router.get(
  "/read/proveedores-por-renovar",
  proveedorController.getProveedoresPorRenovar
); //OBTENER PROVEEDORES POR RENOVAR
module.exports = router;
