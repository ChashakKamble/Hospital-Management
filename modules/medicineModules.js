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
            db.query("select * from medicines",(err,res)=>{
                if(err){
                    console.log("gm err result ",err);
                    reject(err)
                }else{    
                    console.log("gm m result ",res);
                    resolve(res);
                }
            });
        });
}

exports.getPrice=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select price from medicines where id=?",[id],(err,res)=>{
            if(err)
            reject(err);
        else
            resolve(res[0].price);
        });   
    });
}