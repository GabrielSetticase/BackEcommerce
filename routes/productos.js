const express = require('express');
const router = express.Router();
const Productos = require("../src/models/productos");



router.get('/', async function (req, res, next) {
  const verProductos = await Productos.findAll()
  res.json(verProductos)
});

router.post("/", async function (req, res, next) {
  crearProducto = Productos.create(req.body)
  res.status(200).json({
    message: `El producto ${crearProducto.nombre} ha sido agregado exitosamente`
  });
})

module.exports = router;
