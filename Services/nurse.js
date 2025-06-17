 const nurseModel=require("../modules/nurseModules");
 class Nurse {

    async createNurse (name,contact,shift){
        try{
            const result=await nurseModel.addNurse(name,contact,shift);
            return result;
        }catch(err){
            return "Error while adding the nurse "+err;
        }
    }

    async listNurse(){
        try{
            const result=await nurseModel.viewAllNurse()
            return result;
        }catch(err){
            return "Error While Getting all nurses "+err;
        }
    }
    async nurseDetails(id){
        try{
            const result=await nurseModel.nurseDetails(id);
            console.log("nurse details ",result);
            return result;
        }catch(err){
            return err;
        }
    }
q
    async updateNurse(id,name,contact,shift){
        try{
            const result=await nurseModel.updateNurse(id,name,contact,shift);
            return result;
        }catch(err){
            return "Error while Updating nurse "+err;
        }
    }

    async deleteNurse(id){
        try{
            const result=await nurseModel.deleteNurse(id)
            return result;
        }catch(err){
            return "Error While Deleting nurse "+err;
        }
    }

    async searchNurse(val){
        try{
            const result=await nurseModel.searchNurse(val);
            return result;
        }catch(err){
            return "Error while searching data "+err;
        }
    }
 }


 module.exports=Nurse;