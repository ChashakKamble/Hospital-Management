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
}



module.exports=Patient;