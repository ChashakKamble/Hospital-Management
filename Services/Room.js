 const roomModel=require("../modules/roomsModules");
 const patientModel=require("../modules/patientModules")
 class Room {

    async createRoom (roomNo,type,charge){
        try{
            const result=await roomModel.createRoom(roomNo,type,charge);
            return result;
        }catch(err){
            return "Error while Creating the Room "+err;
        }
    }

    async setUnavailable(id){
        try{
            const result=await roomModel.setUnavailable(id);
            return result;
        }catch(err){
            return err;
        }
    }

      async setAvailable(id){
        try{
            const patient=await patientModel.getPatient(id);
            let roomId=patient[0].room_id;
            const result=await roomModel.setAvailable(roomId);
            return result;
        }catch(err){
            return err;
        }
    }

    async viewAllRooms(){
        try{
            const result=await roomModel.viewAllRooms();
            return result;
        }catch(err){
            return "Error While Getting all rooms "+err;
        }
    }


    async availableRooms(){
        try{
            const result=await roomModel.availableRooms()
            return result;
        }catch(err){
            return err;
        }
    }
    
    async roomDetails(id){
        try{
            const result=await roomModel.roomDetails(id);
            console.log("room details ",result);
            return result;
        }catch(err){
            return err;
        }
    }

    async UpdateRoom(id,roomNo,type,charge){
        try{
            const result=await roomModel.updateRoom(id,roomNo,type,charge);
            return result;
        }catch(err){
            return "Error while Updating room "+err;
        }
    }

    async deleteRoom(id){
        try{
            const result=await roomModel.deleteRoom(id)
            return result;
        }catch(err){
            return "Error While Deleting Room "+err;
        }
    }
 }


 module.exports=Room;