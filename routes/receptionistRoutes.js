const express =require("express");
const receptionistRouter=express.Router();
   
const receptionistController=require("../controllers/receptionistConstollers");


// routes for the rooom manaagement
receptionistRouter.get("/",receptionistController.receptionDash);
receptionistRouter.get("/room",receptionistController.addRoomPage);
receptionistRouter.post("/room",receptionistController.createRoom);
receptionistRouter.get("/rooms",receptionistController.listRooms);
receptionistRouter.get("/getRoomDetails/:id",receptionistController.getRoomDetails);
receptionistRouter.put("/room/:id",receptionistController.updateRoom);
receptionistRouter.delete("/room/:id",receptionistController.deleteRoom);


// routes for nurse management
receptionistRouter.get("/nurse",receptionistController.addNursePage);
receptionistRouter.post("/nurse",receptionistController.createNurse);
receptionistRouter.get("/nurses",receptionistController.listNurse);
receptionistRouter.get("/getNurseDetails/:id",receptionistController.nurseDetails);
receptionistRouter.post("/updateNurse",receptionistController.updateNurse);
receptionistRouter.delete("/nurse/:id",receptionistController.deleteNurse);
receptionistRouter.get("/searchNurse",receptionistController.searchNurse);

//routes for patient management
receptionistRouter.get("/patient",receptionistController.addPatientPage);
receptionistRouter.post("/patient",receptionistController.createPatient);
receptionistRouter.get("/patients",receptionistController.listPatient);

module.exports=receptionistRouter;