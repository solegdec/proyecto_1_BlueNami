const express= require ("express");
const router= express.Router();

const adminProductController= require ("../controllers/adminProductController.js")

router.get ("/", adminProductController.entrarAdminProduct);

module.exports = router;