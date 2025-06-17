const express =require("express");
const receptionistRouter=express.Router();
   
const receptionistController=require("../controllers/receptionistConstollers");


// routes for the rooom manaagement
receptionistRouter.get("/",receptionistController.receptionDash);

receptionistRouter.get("/room",receptionistController.addRoomPage);
receptionistRouter.post("/room",receptionistController.createRoom);
receptionistRouter.get("/rooms",receptionistController.listRooms);
receptionistRouter.put("/room/:id",receptionistController.updateRoom);
receptionistRouter.delete("/room/:id",receptionistController.deleteRoom);




module.exports=receptionistRouter;