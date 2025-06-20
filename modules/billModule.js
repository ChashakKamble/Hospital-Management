const db=require("../config/db");

// check if bill exists
exports.billExists = async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from bill where patient_id=?",[id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        });
    })
}
exports.addBill=async (id , rc , dc,nc ,mc ,ta)=>{
    if (isNaN(rc) || isNaN(mc)) {
        throw new Error("Invalid values for room or medicine charge");
    }
    return new Promise((resolve,reject)=>{
        let date =new Date();
        db.query("insert into bill values (null,?,?,?,?,?,?,?)",[id , rc , dc,nc ,mc ,ta,date],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res);
        })
    })
}

// update bill
exports.updateBill =async(id , rc , dc,nc ,mc ,ta)=>{
     if (isNaN(rc) || isNaN(mc)) {
        throw new Error("Invalid values for room or medicine charge");
    }
    return new Promise((resolve,reject)=>{
        let date =new Date();
        db.query("update Bill set room_charge=? ,treatement_charge=?,nurse_charge=?,medicine_charge=?,total_amount=? ,billing_date=? where patient_id=?",
            [ rc , dc,nc ,mc ,ta,date,id],(err,res)=>{
                if(err)
                    reject(err)
                else
                    resolve(res)
            }
        )
    })
}
// get bill for patient
exports.getBill=async (id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from patientinfo where pid=? order by bdate desc ",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res);
        })
    })
}