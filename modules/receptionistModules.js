const { response } = require("express");
const db=require("../config/db");

exports.createReceptionist = async (name, email, contact, status, userid, adminid) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO reception  VALUES (null,?, ?, ?, ?, ?, ?)", 
        [name, email, contact, status, userid, adminid], (err, result) => {
            if (err) {
                reject("Error while creating receptionist: " + err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getAllReceptionist = async () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM reception", (err, result) => {
            if (err) {
                reject("Error while getting receptionist: " + err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getReceptionist=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from reception where reception_id=?",[id],(err,res)=>{
            if(err)
                reject(err)
            else    
                resolve(res);
        });
    });
}

exports.updateReceptionist=async(id,name,email,contact,status)=>{
    return new Promise((resolve,reject)=>{
        db.query("update reception set reception_name=?, reception_email=?,reception_contact=?,status=? where reception_id=?",[name,email,contact,status,id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res)
        });
    });

   
}
exports.activeRecCount=async()=>{    
        return new Promise((resolve,reject)=>{
            db.query("select count(*) as receptions from reception where status='Available'",(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res)  
            })
        })

} 
