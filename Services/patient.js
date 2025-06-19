const patiModel=require("../modules/patientModules");

class Patient {
    async addPatient(name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor){
        try{
            const result=patiModel.addPatient(name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor);
            return result;
        }catch(err){
            return err;
        }
    }
    async viewAllPatient(){
        try{
            const result=await patiModel.viewAllPatient();
            return result;
        }catch(err){
            return err;
        }
    }

    async  getAllocatedPatient(id){
        try{
            const result=await patiModel.getAllocatedPatient(id);
            return result;
        }catch(err){
            return err;
        }   
    }

    async setChecked(id){
        try{
            const result=await patiModel.setChecked(id);
            return result;
        }catch(err){
            return err;
        }
    }

    async setDischared(id){
        try{
            const result=await patiModel.setDischared(id);
            return result;
        }catch(err){
            return err;
        }
    }

    async addmittedPatient(id){
        try{
            const result=await patiModel.addmittedPatients(id);
            return result;
        }catch(err){
            return err;
        }
    }

    async dischagedPatient(id){
        try{
            const result=await patiModel.dischagedPatients(id);
            return result;
        }catch(err){
            return err;
        }
    }

}



module.exports=Patient;