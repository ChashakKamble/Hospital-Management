let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
const con = require("../config/db");
let doctorSer = new doctorService();
exports.homePage = (req, res) => {
    res.render("home");
}

exports.loginPage = (req, res) => {
    res.render("login",{message: ""});
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
    if (typeof result === "object") {
        req.session.userId = result.user_id; // Store user ID in session
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
    let { name, email, contact, speci, exp, status } = req.body;
    let adminUserid =req.session.userId; // assuming adminid is stored in session
    console.log("session id ",req.session.userId);
    let admin=await userSer.getAdmin(adminUserid);
    console.log("Admin ID:", admin);
    let result = await doctorSer.registerDoctor(name, email, contact, speci, exp, status, admin.admin_id);
    if (typeof result === "object" && result.affectedRows > 0) {
        let allDocs = await doctorSer.getDoctors();
        res.render("adminDash", {user:admin,doctors:allDocs, message: "Doctor registered successfully!" });
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