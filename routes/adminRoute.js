let express = require("express");
let adminRoutes = express.Router();         
const adminController = require("../controllers/adminControllers");


adminRoutes.get("/searchDoc",adminController.searchDoc);

// route to load reception 
adminRoutes.get("/reception", adminController.receptionistPage);
adminRoutes.post("/reception",adminController.createReceptionist);
adminRoutes.get("/receptions", adminController.getAllReceptionist);
adminRoutes.get("/deleteReceptinist", adminController.deleteReception);
adminRoutes.get("/getReceptionist",adminController.getReceptionist);
adminRoutes.post("/updateReceptionist",adminController.updateReceptionist);

module.exports = adminRoutes;