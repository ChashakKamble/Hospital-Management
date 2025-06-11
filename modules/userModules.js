
const db=require("../config/db.js");
exports.isUsernameTaken=async(username)=>{
    return new Promise((responce,reject)=>{
        db.query("select * from users where username = ?",[username],(err,res)=>{
            if(err)
                reject("Error while checking the username Availability : "+err)
            if(res.length==0)
                responce(true);
            else
                responce(false);
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
            if(err)
                reject("Error while authenticating user : "+err)
            if(res.length==0)
                responce(false);
            else
                responce(res[0]);
        })
    });
}
