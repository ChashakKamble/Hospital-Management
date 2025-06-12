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