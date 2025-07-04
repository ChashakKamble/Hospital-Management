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
        db.query("insert into patient values (null,?,?,?,?,?,?,null,?,?,?,'Admitted',0,null,null)",[name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor],
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

exports.updatePatient = async(id ,name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor )=>{
    return new Promise((resolve,reject)=>{
        db.query("update patient set patient_name=?,patient_age=?,patient_gender=?,patient_contact=?,patient_issue= ?,admitted_date=?,room_id=?,nurse_id=?,doctor_id=? where patient_id=?",
            [name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor,id],
            (err,res)=>{
                if(err)
                    reject(err);
                else    
                    resolve(res);
            }
        )
    })
}

exports.deletePatient=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from table where patient_id =?",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res)
        })
    })
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

// for the count of assigned patients
exports.countAssigned=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select count(patient_id) as Assigned from patient where doctor_id=? and check_status=0",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res)
        })
    })
}

// total checked patient
exports.totalChecked =async()=>{
    return new Promise((resolve,reject)=>{
        db.query("select count(patient_id) as totalChecked from patient where check_status=1 and status='Admitted'",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res)
        })
    })
}

// for the count of assigned Patients  
exports.countAddmitedForDoc =async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select count(patient_id) as  Admitted from patient where doctor_id=? and status='Admitted'",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res)
        })
    })
}

//count total Admitted in hospital
exports.totalAdmitted =async()=>{
    return new Promise((resolve,reject)=>{
        db.query("select count(patient_id) as  totalAddmitted from patient where  status='Admitted'",(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res)
        })
    })
}

// for count of total dischared patient
exports.countDischarged =async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select count(patient_id) as discharged  from patient where doctor_id=? and status='Discharge'",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res)
        })
    })
}