const db=require("../config/db")
// patient_id
// patient_name
// patient_age
// patient_gender
// patient_contact
// patient_issue
// admitted_date
// discharge_date
// room_no
// nurse_id
// doctor_id
// status
// check_status
exports.addPatient= async(name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor)=>{
    return new Promise((resolve,reject)=>{
        db.query("insert into patient values (null,?,?,?,?,?,?,null,?,?,?,'Admitted',0)",[name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor],
            (err,res)=>{
                if(err)
                    reject(err);
                else
                    resolve(res);
            }
        )

    });
}

exports.getPatient=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from patient where patient_id=?",[id],(err,res)=>{
            if(err)
                reject(err);
            else    
                resolve(res);
        })
    })
}

exports.viewAllPatient=async ()=>{
    return new Promise((resolve,reject)=>{
        db.query("Select * from patientinfo order by adddate desc",(err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        })
    });
}

// for doctor useage queries
exports.setChecked = async( id )=>{
    return new Promise((resolve,reject)=>{
        db.query("update patient set check_status=1 where patient_id=?",[id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}
exports.setDischared= async(id)=>{
    
    return new Promise((resolve,reject)=>{
        let date=new Date(); 
        db.query("update patient set status='Discharge',discharge_date=? where patient_id=?",[date,id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    });
}
exports.getAllocatedPatient = async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from patient where doctor_id=? order by admitted_date desc",[id],(err,res)=>{
            if(err){    
                reject(err);
        }else{
                resolve(res);
        }
        })
    })
}

exports.addPriscription = async(id,note,priscription)=>{
    console.log("values are : "+id+" "+note+" "+priscription);
    return new Promise((resolve,reject)=>{
        db.query("update patient set note=? , priscription=? where patient_id=?",[note,priscription,id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
}

exports.getPriscription = async ( id )=>{
    return new Promise((resolve,reject)=>{
        db.query("select priscription  from patient where patient_id = ? ",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res);
        })
    })
}

exports.addmittedPatients = async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from patient where status='admitted'and doctor_id=?",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res)
        })
    });
}

exports.dischagedPatients = async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from patient where status='discharge' and doctor_id=?",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res)
        })
    });
}
