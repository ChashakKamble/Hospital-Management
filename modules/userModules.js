
const db=require("../config/db.js");

exports.addUser=async(username,pass,role)=>{
    console.log(db);
    return new Promise((reject,resp)=>{
    db.query("insert into users values(null,?,?,?);",[username,pass,role],(err,res)=>{
        if(err)
            reject(err)
        else
            resp(res);
    })
    });
}
