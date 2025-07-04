
const patimodel=require("../modules/patientModules");
const docmodel=require("../modules/doctorModules");
const recemodel=require("../modules/receptionistModules");

class Admin{
    async dashBoard(){
        try{
        let totalAddmitted=await patimodel.totalAdmitted();
        console.log(totalAddmitted);
        let docCount=await docmodel.activeDocCout();
         console.log(docCount);
        let receCount=await recemodel.activeRecCount();
         console.log(receCount);
        return {
        totalAdmitted: totalAddmitted[0].totalAddmitted,  // Assuming alias used in SQL
        doctors: docCount[0].doctors,
        receptions: receCount[0].receptions
        };
    } catch(err){
        return err;
    }
    }
}

module.exports=Admin;