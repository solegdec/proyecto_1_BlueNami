const express= require ("express");
const router= express.Router();

const userController= require ("../controllers/userController.js")


//list
router.get("/", userController.list);

//detail
router.get("/:id", userController.detail);

//create 
router.get("/adminUser/create", userController.create);
router.post("/adminUser", userController.store);

//edit
router.get("/:id/edit", userController.edit);
router.put("/:id/edit", userController.update);

// delete
router.delete("/delete/:id", userController.destroy);


module.exports = router;