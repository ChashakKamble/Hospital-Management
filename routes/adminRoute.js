let express = require("express");
let adminRoutes = express.Router();         
const adminController = require("../controllers/adminControllers");


// route to load reception 
adminRoutes.get("/reception", adminController.receptionistPage);
adminRoutes.post("/reception",adminController.createReceptionist);
adminRoutes.get("/receptions", adminController.getAllReceptionist);

module.exports = adminRoutes;