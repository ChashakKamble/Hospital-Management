let express=require("express");
let routes=express.Router();
const controller=require("../controllers/hospitalControllers");

// for homepage
routes.get("/",controller.homePage);

// for loginpage
routes.get("/login",controller.loginPage);
// for adding user
routes.post("/addUser",controller.addUser);

// for authenticating user
routes.post("/authenticateUser",controller.authenticateUser);

module.exports=routes;