const mediModule=require("../modules/medicineModules");

class Medicine{
    async addMedicine(name,price){
        try{
            const result= await mediModule.addMedicine(name,price);
            return result;
        }catch(err){
            return err;
        }
    }

    async getMedicine(){
        try{
            const result=await mediModule.getMedicine();
            console.log("before return gm s ",result);
            return result;
        }catch(err){
            return err;
        }
    }
}

module.exports=Medicine;