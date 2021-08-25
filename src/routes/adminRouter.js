const express= require ("express");
const router= express.Router();

const adminController= require ("../controllers/adminController.js")

//list
router.get ("/", adminController.list);

//create 
router.get("/create", adminController.create);
router.post("/create", adminController.store);

//edit
router.get("/:id/edit", adminController.edit);
router.put("/:id/edit", adminController.update);

// delete
router.delete("/destroy/:id", adminController.destroy);

//detail
router.get("/detail/:id", adminController.detail);

module.exports = router;
