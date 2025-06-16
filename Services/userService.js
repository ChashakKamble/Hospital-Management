const userModel=require("../modules/userModules");
const bcrypt=require("bcrypt");
const salt=10;
class UserService{

    async addUser(username,pass,role){
        try{
            let isUserTaken=await userModel.isUsernameTaken(username);
            if(isUserTaken){
            let hashPass=await bcrypt.hash(pass,salt);
            let result=await userModel.addUser(username,hashPass,role);
            return result;
            }else{
                return "Username Already Exits";
            }
        }catch(err){
            return err;
        } 
    }
    async getAdmin(userid){
        try{
            let admin=await userModel.getAdmin(userid);
            if(admin){
                return admin;
            }else{
                return "Admin Not Found";
            }
        }catch(err){
            return err;
        }   
    }

    async getUser(userid){
        try{
            let user=await userModel.getUserById(userid);
            return user;    
        }catch(err){
            return err;
        }   
    }

    async authenticateUser(username,pass,role){
        try{
            let user=await userModel.authenticateUser(username,role);
            if(user){
                let isPassMatch=await bcrypt.compare(pass,user.password);
                if(isPassMatch){
                    return user;
                }else{
                    return "Invalid Password";
                }
            }else{
                return "User Not Found";
            }
        }catch(err){
            return err;
        }
    }
    
    async updateUser(userid,username,pass){
        try{
            let isUserTaken=await userModel.isUsernameTaken(username);
            if(isUserTaken.length===0 || (isUserTaken.length>0 && isUserTaken[0].user_id===userid)){
                let hashPass=await bcrypt.hash(pass,salt);
                let result=await userModel.updateUser(userid,username,hashPass);
                return result;
            }else{
                return "Email Already Exits For Other User";
            }
        }catch(err){
            return err;
        } 
    }
    async deleteUser(userid){
        try{
            let result=await userModel.deleteUser(userid);
            return result;
        }catch(err){
            return err;
        }
    }   
}
module.exports=UserService;