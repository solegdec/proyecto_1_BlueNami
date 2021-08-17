const express= require ("express");
const router= express.Router();

const adminUserController= require ("../controllers/adminUserController.js")

router.get ("/", adminUserController.entrarAdminUser);

module.exports = router;