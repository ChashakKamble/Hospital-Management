let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
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
        req.session.user = result;
        if (role === "Admin") {
            res.render("adminDash",{message:""});
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
    let adminid =5; // assuming adminid is stored in session
    let result = await doctorSer.registerDoctor(name, email, contact, speci, exp, status, adminid);
    if (typeof result === "object" && result.affectedRows > 0) {
        res.render("adminDash", { message: "Doctor registered successfully!" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("adminDash", { message: result });
    }
}