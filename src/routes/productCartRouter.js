const express= require ("express");
const router= express.Router();
const productCartController= require ("../controllers/productCartController.js")
const authMiddleware = require("../middlewares/authMiddleware");

router.get ("/", productCartController.listCart);
//router.post("/add/:id", authMiddleware ,productCartController.addProduct);
//router.post("/order/add", authMiddleware ,productCartController.addOrder);
//router.post("/item/delete/:id" , productCartController.destroyItem);


module.exports = router;






