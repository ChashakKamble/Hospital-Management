let express=require("express");
let routes=express.Router();
const controller=require("../controllers/hospitalControllers");

routes.get("/",controller.homePage);

module.exports=routes;