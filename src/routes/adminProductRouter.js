const express= require ("express");
const router= express.Router();

const adminProductController= require ("../controllers/adminProductController.js")

router.get ("/adminProduct", adminProductController.entrarAdminProduct);
router.get ("/adminAddProduct", adminProductController.entrarAdminAddProduct);
router.post ("/adminAddProduct", adminProductController.crearAdminAddProduct);
router.get ("/adminModProduct", adminProductController.entrarAdminModProduct);
router.put ("/adminModProduct", adminProductController.editarAdminModProduct);
router.delete ("/adminProduct", adminProductController.borrarAdminAddProduct);

module.exports = router;