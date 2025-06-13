let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");
let doctorSer = new doctorService();
exports.homePage = (req, res) => {
    res.render("home");
}

exports.loginPage = async (req, res) => {
    let userToken = req.cookies.userToken;
    if(!userToken){
        res.render("login",{message: ""});
        return;
    }else{
        // Verify the JWT token
        jwt.verify(userToken, secretKey,async (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err);
                res.render("login", { message: "Session expired. Please log in again." });
            } else {
                // If token is valid, redirect to the appropriate dashboard
                if (decoded.role === "Admin") {
                    let allDocs=await doctorSer.getDoctors();
                    //res.render("./adminView/adminDefaultView",{user:decoded});
                    res.render("adminDash",{user:decoded,message:"",doctors:allDocs});
                    return;
                } else if (decoded.role === "Doctor") {
                    res.redirect("/doctorDash");
                } else if (decoded.role === "Reception") {
                    res.redirect("/receptionDash");
                } else {
                    res.render("login", { message: "Invalid role." });
                }
            }
        });
    }

}

exports.servicePage = (req, res) =>{
    res.render("services");
}

exports.addUser = async (req, res) => {
    let { username, pass, role } = req.body;
    let result = await userSer.addUser(username, pass, role);
    if (typeof result === "object" && result.affectedRows > 0) {
        res.render("adminDash", { message: "User added successfully!" });
    } else if (typeof result === "string" && result.startsWith("Username")) {
        res.render("error", { message: result });
    } else
        if (typeof result === "string" && result.startsWith("Error")) {
            res.render("error", { message: result });
        }
}


//use the jwt token to authenticate the user
exports.authenticateUser = async (req, res) => {
    let { username, pass, role } = req.body;
    let result = await userSer.authenticateUser(username, pass, role);
    console.log("cheking result ",result);
    if (typeof result === "object") {
        // Generate JWT token
        let user={...result};
        const token = jwt.sign(user, secretKey, { expiresIn: '24h' });
        // store userId in cookie
        res.cookie("userToken", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 ,// 24 hours
             });
        if (role === "Admin") {
            let allDocs=await doctorSer.getDoctors();
            res.render("adminDash",{user:result,message:"",doctors:allDocs});
            return;
        } else if (role === "Doctor") {
            res.render("doctorDash");
            return ;
        } else if (role === "Reception") {
            res.render("receptionDash");
            return;
        }
       
    } else if (typeof result === "string" && result.startsWith("Invalid")) {
        res.render("login", { message: result });
    } else if (typeof result === "string" && result.startsWith("User")) {
        res.render("login", { message: result });
    } else {
        res.render("login", { message: "An unexpected error occurred." });
    }
}

exports.registerDoctor = async (req, res) => {
    let { doctor_name, email, contact, doctor_specialization, doctor_experience, role, status } = req.body;
    // use token to get the admin id
     // assuming adminid is stored in session

   // let admin=await userSer.getAdmin(adminUserid);
  //  console.log("Admin ID:", admin);
    let result = await doctorSer.registerDoctor(doctor_name, email, contact, doctor_specialization, doctor_experience, role, status, null);
    if (typeof result === "object" && result.affectedRows > 0) {
        let allDocs = await doctorSer.getDoctors();
        res.render("adminDash", {user:null,doctors:allDocs, message: "Doctor registered successfully!" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}


exports.updateDoctor = async (req, res) => {
    let { id, name, email, contact, speci, exp, status,uid } = req.body;
   // uid is doctors user id 
    let result = await doctorSer.updateDoctor(id, name, email, contact, speci, exp, status,uid);
    if (typeof result === "object" && result.affectedRows > 0) {
        let allDocs = await doctorSer.getDoctors();
        res.render("adminDash", {user:result,message: "Doctor updated successfully!",doctors:allDocs });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}

//register Reception
exports.registerReception = async (req, res) => {
    let { name, email, contact, role, status } = req.body;
    // use token to get the admin id
     // assuming adminid is stored in session

   // let admin=await userSer.getAdmin(adminUserid);
  //  console.log("Admin ID:", admin);
    let result = await receptionSer.registerReception(name, email,contact, role, status, null);
    if (typeof result === "object" && result.affectedRows > 0) {
        let allRec = await receptionSer.getReception();
        res.render("adminDash", {user:null,reception:allRec, message: "Reception registered successfully!" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}

//update reception
exports.updateReception = async (req, res) => {
    let { reception_name, email, reception_contact, role, status,uid } = req.body;
   // uid is doctors user id 
    let result = await receptionSer.updateReception(reception_name, email, reception_contact, role, status,uid);
    if (typeof result === "object" && result.affectedRows > 0) {
        let allRec = await receptinSer.getReception();
        res.render("adminDash", {user:result,message: "Reception updated successfully!",reception:allRes });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}

//for logout 
exports.logout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            console.error("Session destruction error:", err);
            res.status(500).send("Internal Server Error : Unable to log out");
        } else {
            res.redirect("/login");
        }
    });
}