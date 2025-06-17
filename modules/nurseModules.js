
const db=require("../config/db");

exports.addNurse= async(name,contact, shift) =>{
    return new Promise((resolve,reject)=>{
        db.query("insert into  nurse values (null,?,?,?)",[name,contact, shift],(err,res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        })

    });
}

exports.nurseDetails= async (id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from nurse where nurse_id = ?",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res);
        });
    })

}
exports.viewAllNurse = async ()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from nurse ",(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })

}

exports.updateNurse=async (id,name,contact, shift)=>{
    return new Promise((resolve,reject)=>{
        db.query("update nurse set nurse_name=? , nurse_contact = ? , nurse_shift=?  where nurse_id=?",[name,contact,shift,id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
}

exports.deleteNurse=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from nurse where nurse_id =?",[id],(err,res)=>{
            if(err)
                reject(err);
            else 
                resolve(res);
        })
    })
}

exports.searchNurse= async(val)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from nurse where nurse_name like ?",['%'+val+"%"],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}