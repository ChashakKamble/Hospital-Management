const modules = require('../modules/doctorModules');
const patiModel=require("../modules/patientModules");
const userService = require('./userService');

class DoctorService extends userService {

    // you will need to pass the userid and adminid to registerDoctor method
    // userid will be obtained by creating the user first
    // adminid will be passed from the controller where this service is called likly got from token
    async registerDoctor(name, email, contact, speci, exp, status,adminid) {
        try {
            let user = await this.addUser(email,contact,"Doctor")
            let userid=user.insertId; // assuming userService has a user object with userid
            let result = await modules.registerDoctor(name, email, contact, speci, exp, status, userid, adminid);
            return result;
        } catch (err) {
            return "Error while registering doctor: " + err;
        }
    }

    async getDoctor(id) {
        try {
            let result = await modules.getDoctor(id);
            console.log("Doctor details: ", result); 
            return result;
        } catch (err) {
            return "Error while getting doctor: " + err;
        }
    }
    async getDoctors() {
        try {
            let result = await modules.getDoctors();
            return result;
        } catch (err) {
            return "Error while getting doctors: " + err;
        }
    }  

    async getId(uid){
        try{
            const result=await modules.getId(uid);
            return result;
        }catch(err){
            return "Error While Getting doctor id "+err;
        }
    }
    
    async searchDoc(val){
        console.log("Searhing doctor for name like ",val);
        try{
            const result=await modules.searchDoc(val);
            if(result)
                return result;
            else    
                return "Unable to Search Doctors";
        }catch(err){
            return "Error While Searching Doctors : "+err;
        }
    }

    async updateDoctor(id, name,email,contact, speci, exp, status,user_id) {
       
        try{
            const result=await Promise.all([this.updateUser(user_id,email,contact),modules.updateDoctor(id, name,email,contact,speci, exp, status)]);
            return result;
        }catch (err) {
            return "Error while updating doctor: " + err;
        }
    }

    async addPriscription(id , note ,priscription){
        try{
            const result=await patiModel.addPriscription(id,note,priscription);
            return result;
        }catch(err){
            return "Erroer while adding priscription"+err;
        }
    }
}

module.exports = DoctorService;