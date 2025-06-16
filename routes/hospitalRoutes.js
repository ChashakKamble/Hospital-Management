let express=require("express");
let routes=express.Router();
const controller=require("../controllers/hospitalControllers");
const adminCtr=require("../controllers/adminControllers");

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

//to load admin dashboard
routes.get("/adminDash",adminCtr.adminDefault);
// to load doctor registration page
routes.get("/registerDoctor",adminCtr.docRegPage);
// for registering doctor
//for viewing all doctors
routes.get("/viewDoctor",adminCtr.viewDoctor);

routes.post("/registerDoctor",controller.registerDoctor);

// for getting  doctor
routes.get("/getDoctor",adminCtr.getDoctor);
//for update doctor
routes.post("/updateDoctor",controller.updateDoctor);
//for deleting doctor
routes.get("/deleteDoctor",controller.deleteDoctor);

//for deleting reception
//routes.get("/deleteReception",controller.deleteReception);
//for logout
routes.get("/logout",controller.logout);

module.exports=routes;