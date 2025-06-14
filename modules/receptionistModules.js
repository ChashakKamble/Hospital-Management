const db=require("../config/db");

exports.createReceptionist = async (name, email, contact, status, userid, adminid) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO reception  VALUES (null,?, ?, ?, ?, ?, ?)", 
        [name, email, contact, status, userid, adminid], (err, result) => {
            if (err) {
                reject("Error while creating receptionist: " + err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getAllReceptionist = async () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM reception", (err, result) => {
            if (err) {
                reject("Error while getting receptionist: " + err);
            } else {
                resolve(result);
            }
        });
    });
}
