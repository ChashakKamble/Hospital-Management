const db=require("../config/db.js");


exports.registerDoctor = async (name,email,contact, speci, exp , status,userid,adminid) => {
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