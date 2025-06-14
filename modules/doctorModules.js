const db=require("../config/db.js");


exports.registerDoctor = async (name,email,contact, speci, exp , status,userid,adminid) => {
    console.log("admin id ",adminid)
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO doctors  VALUES (null,?,?,?,?,?,?,?,?)", [name, email,contact,speci,exp,status,userid,adminid], (err, result) => {
            if (err) {
                reject("Error while registering doctor: " + err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getDoctor = async (id) => { 
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM doctors WHERE doctor_id=?", [id], (err, result) => {
            if (err) {
                reject("Error while getting doctor: " + err);
            } else if (result.length === 0) {
                resolve("No doctor found with the given ID.");
            } else {
                resolve(result);
            }
        });
    });
}

exports.getDoctors=async()=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM doctors", (err, result) => {
            if (err) {
                reject("Error while getting doctors: " + err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.updateDoctor = async ( id,name, email, contact, speci, exp, status) => {
    console.log("query Updating doctor with ID: ", id);
     return new Promise((resolve, reject) => {
            db.query(
                "UPDATE doctors SET doctor_name=?,doctor_email=?,doctor_contact=?, doctor_specialization=?, doctor_experience=?, status=? WHERE doctor_id=?",
                [name,email,contact, speci,exp, status, id],
                (err, result) => {
                    if (err) {
                        reject("Error while updating doctor: " + err);
                    } else {
                        console.log("Update result sccessful: ",result);
                        resolve(result);
                    }
                }
            );
        });
}