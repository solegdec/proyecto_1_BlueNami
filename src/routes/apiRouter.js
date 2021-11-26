const express= require ("express");
const router= express.Router();
const apiController= require ("../controllers/api/apiController.js")

router.get('/products', apiController.listProducts);
router.get("/products/:id", apiController.detailProduct);
router.get('/search', apiController.search);

router.get('/marcas', apiController.listMarcas);
router.get('/colours', apiController.listColours);




router.get('/users', apiController.listUsers);
router.get("/users/:id", apiController.detailUser);
router.get('/categorias', apiController.listCategories);









module.exports = router;