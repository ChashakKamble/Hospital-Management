const express=require("express")
const doctorRoutes=express.Router();
const doctorController= require("../controllers/doctorControllers");

// routes while treating patient
doctorRoutes.get("/",doctorController.doctorDefault);
doctorRoutes.get("/patients/:docId",doctorController.getAllocatedPatient);
doctorRoutes.get("/setChecked/:id",doctorController.setChecked);
doctorRoutes.get("/addmittedPatients/:id",doctorController.addmittedPatient);
doctorRoutes.get("/dischargedPatients/:id",doctorController.dischargedPatient);
doctorRoutes.get("/priscriptionPage/:id",doctorController.priscriptionPage);
doctorRoutes.post("/addPriscription",doctorController.addPriscription);

//routes for the medicine options 
doctorRoutes.get("/medicine",doctorController.addMedicinePage);
doctorRoutes.post("/medicine",doctorController.addMedicine);
doctorRoutes.get("/medicines",doctorController.viewMedicine);




module.exports=doctorRoutes;