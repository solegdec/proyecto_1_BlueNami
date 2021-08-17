const express= require ("express");
const router= express.Router();

const adminModProductController= require ("../controllers/adminModProductController.js")

router.get ("/", adminModProductController.entrarAdminModProduct);




module.exports = router;