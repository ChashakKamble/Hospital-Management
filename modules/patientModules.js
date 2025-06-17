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
exports.addPatient= async(name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor){
    return new Promise((resolve,reject)=>{
        db.query("insert into patient values (null,?,?,?,?,?,?,null,???,'Admitted',null)",[name,age,gender,contact,issue,admitionDate,roomNo,nurse,doctor],
            (err,res)=>{
                if(err)
                    reject(err);
                else
                    resolve(res);
            }
        )

    });
}