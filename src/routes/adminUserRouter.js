const express= require ("express");
const router= express.Router();

const adminUserController= require ("../controllers/adminUserController.js")


router.get ("/adminUser", adminUserController.entrarAdminUser);
router.get ("/adminAddUser", adminUserController.entrarAdminAddUser);
router.post ("/adminAddUser", adminUserController.crearAdminAddUser);
router.get ("/adminModUser", adminUserController.entrarAdminModUser);
router.put ("/adminModUser", adminUserController.editarAdminAddUser);
router.delete ("/adminUser", adminUserController.borrarAdminAddUser);

module.exports = router;