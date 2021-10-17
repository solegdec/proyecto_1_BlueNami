const express= require ("express");
const router= express.Router();
const userController= require ("../controllers/userController.js");
const validations = require ('../middlewares/regFormMidd.js')
const guestMiddleware = require ('../middlewares/guestMiddleware.js')
const authMiddleware = require ('../middlewares/authMiddleware.js');
const fileUpload = require("../middlewares/userMulterMidd.js");





//list
router.get("/", userController.list);

//detail
router.get("/profile/:id", userController.profile);

//create 
router.get("/create", userController.create);
router.post("/create",fileUpload.single("avatar"),validations, userController.store);

//edit
router.get("/:id/edit", userController.edit);
router.put("/:id/edit",fileUpload.single("avatar"), userController.update);

// delete
router.delete("/destroy/:id", userController.destroy)

module.exports = router;