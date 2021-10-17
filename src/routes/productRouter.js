const express= require ("express");
const router= express.Router();

//router para acceder al listado de producto, detalle de producto y barra de busqueda  desde el home


const productController= require ("../controllers/productController.js")


///list
router.get("/", productController.list);
router.get("/buscar", productController.buscar);

//detail
router.get("/:id", productController.detail);

module.exports = router;
