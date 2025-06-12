const modules = require('../modules/doctorModules');
const userService = require('./userService');

class DoctorService extends userService {

    // you will need to pass the userid and adminid to registerDoctor method
    // userid will be obtained by creating the user first
    // adminid will be passed from the controller where this service is called likly got from token
    async registerDoctor(name, email, contact, speci, exp, status,adminid) {
        try {
            let user = await this.addUser(email,contact,"Doctor")
            let userid=user.insertId; // assuming userService has a user object with userid
            console.log("User ID: "+ userid+" adminid "+adminid);
            let result = await modules.registerDoctor(name, email, contact, speci, exp, status, userid, adminid);
            return result;
        } catch (err) {
            return "Error while registering doctor: " + err;
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
}

module.exports = DoctorService;