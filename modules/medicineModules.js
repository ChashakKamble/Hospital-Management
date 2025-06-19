const db=require("../config/db.js");
exports.addMedicine= async(name,price)=>{
    return new  Promise((resolve,reject)=>{
        db.query("insert into medicines values (null,?,?) ",[name, price],(err,res)=>{
            if(err)
                reject(err);
            else    
                resolve(res);
        })
    })
}

exports.getMedicine=async()=>{
    return new Promise((resolve,reject)=>{
        return new Promise((resolve,reject)=>{
            db.query("select * from medicines",(err,res)=>{
                if(err)
                    reject(err)
                else    
                    resolve(res);
            })
        })
    });
}