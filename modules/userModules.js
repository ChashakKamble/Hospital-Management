
const db=require("../config/db.js");
exports.isUsernameTaken=async(username)=>{
    return new Promise((responce,reject)=>{
        db.query("select * from users where username = ?",[username],(err,res)=>{
            if(err)
                reject("Error while checking the username Availability : "+err)
            else
                responce(res);
        })
    });
}

// get all active doctors


// to get the admin by user id
exports.getAdmin=async(userId)=>{
    return new Promise((responce,reject)=>{
        db.query("select * from admins where user_id = ? ",[userId],(err,res)=>{
            if(err)
                reject("Error while getting admin by id : "+err)
            else
                responce(res[0]);
        })
    }); 
}
 
exports.getUserById=async(userId)=>{    
    return new Promise((responce,reject)=>{
        db.query("select * from users where user_id = ?",[userId],(err,res)=>{
            if(err)
                reject("Error while getting user by id : "+err)
            else
                responce(res[0]);
        })
    }); 
}

exports.addUser=async(username,pass,role)=>{
       return new Promise((resp,reject)=>{
    db.query("insert into users values(null,?,?,?);",[username,pass,role],(err,res)=>{
        if(err)
            reject("Error while adding user : "+err)
        else
            resp(res);
    })
    });
}

exports.authenticateUser=async(username,role)=>{
    return new Promise((responce,reject)=>{
        db.query("select * from users where username = ? and role = ?",[username,role],(err,res)=>{
            if(err){
                reject("Error while authenticating user : "+err)
            }else{
                responce(res[0]);
            }
        })
    });
}

exports.updateUser=async(userId,username,pass)=>{
    console.log("Updating user with ID: ", userId);
    return new Promise((resp,reject)=>{
        db.query("update users set username = ?, password = ? where user_id = ?",[username,pass,userId],(err,res)=>{
            if(err)
                reject("Error while updating user : "+err)
            else if(res.changedRows === 0  ) {
                reject("unable to update user "); 
            }else{
                resp(res);
            }
        })
    });
}
exports.deleteUser=async(userId)=>{
    return new Promise((resp,reject)=>{
        db.query("delete from users where user_id = ?",[userId],(err,res)=>{
            if(err)
                reject("Error while deleting user : "+err)
            else if(res.affectedRows === 0){
                reject("Unable to delete user");
            }else{
                resp(res);
            }
        })
    });
}