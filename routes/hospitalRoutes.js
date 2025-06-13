let express=require("express");
let routes=express.Router();
const controller=require("../controllers/hospitalControllers");

// for homepage
routes.get("/",controller.homePage);
// for loginpage
routes.get("/login",controller.loginPage);
// for Service page
routes.get("/services",controller.servicePage);
// for adding user
routes.post("/addUser",controller.addUser);
// for authenticating user
routes.post("/authenticateUser",controller.authenticateUser);

// for registering doctor
routes.post("/registerDoctor",controller.registerDoctor);

//for update doctor
routes.post("/updateDoctor",controller.updateDoctor);

//for add Receptionist
routes.post("/registerReception",controller.registerReception);

//for update receptionist
routes.post("/updateReception",controller.updateReception);

//for view receptionist
routes.get("viewRec",controller.viewRec);



// for logout
routes.get("/logout",controller.logout);

module.exports=routes;