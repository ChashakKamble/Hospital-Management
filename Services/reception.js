const UserService = require("./userService");
const modules = require("../modules/receptionistModules");
class Reception extends UserService{

    async createReceptionist(name, email, contact,status, adminid) {
        try {
            let user = await this.addUser(email, contact, "Reception");
            let userid = user.insertId; // assuming userService has a user object with userid
            let result = await modules.createReceptionist(name, email, contact,status, userid, adminid);
            return result;
        } catch (err) {
            return "Error while creating receptionist: " + err;
        }
    }

    async getAllReceptionist() {
        try {
            let result = await modules.getAllReceptionist();
            return result;
        } catch (err) {
            return "Error while getting receptionist: " + err;
        }
    }
}

module.exports = Reception;