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

// for registering doctor
routes.post("/registerDoctor",controller.registerDoctor);

// for logout
routes.get("/logout",controller.logout);

//for update doctor
routes.post("/updateDoctor",controller.updateDoctor);

module.exports=routes;