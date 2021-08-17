const express= require ("express");
const router= express.Router();

const adminAddProductController= require ("../controllers/adminAddProductController.js")

router.get ("/", adminAddProductController.entrarAdminAddProduct);




module.exports = router;