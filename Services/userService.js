let userModel=require("../modules/userModules");
class UserService{

    async addUser(username,pass,role){
        try{
            let result=await userModel.addUser(username,pass,role);
            return result;
        }catch(err){
            return err;
        } 
    }
}

module.exports=new UserService();