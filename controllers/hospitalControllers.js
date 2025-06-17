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
                req.session.cur_user=decoded;
                // If token is valid, redirect to the appropriate dashboard
                if (decoded.role === "Admin") {
                  res.redirect("/adminDash");
                } else if (decoded.role === "Doctor") {
                    res.redirect("/doctorDash");
                } else if (decoded.role === "Reception") {
                    res.redirect("/reception");
                } else {
                    res.render("login", { message: "Invalid role." });
                }
            }
        });
    }
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
        // Store the token in a cookie
        res.cookie("userToken", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 ,// 24 hours
             });
        req.session.cur_user = user; // Store user in session
        if (role === "Admin") {
           res.redirect("/adminDash");
            return;
        } else if (role === "Doctor") {
            res.render("doctorDash");
            return ;
        } else if (role === "Reception") {
            res.redirect("/reception");
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
<<<<<<< HEAD
    let { doctor_name, email, contact, doctor_specialization, doctor_experience, role, status } = req.body;
    // use token to get the admin id
     // assuming adminid is stored in session

   // let admin=await userSer.getAdmin(adminUserid);
  //  console.log("Admin ID:", admin);
    let result = await doctorSer.registerDoctor(doctor_name, email, contact, doctor_specialization, doctor_experience, role, status, null);
=======
    let { name, email, contact, speci, exp, status } = req.body;

     const errors = {};

    // Simple validations
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!email || email.trim() === '') errors.email = 'Email is required';
    if (!contact || contact.trim() === '') errors.contact = 'Contact is required';
    if (!speci || speci.trim() === '') errors.speci = 'Specialization is required';
    if (!exp || exp.trim() === '') errors.exp = 'Experience is required';
    if (!status || status.trim() === '') errors.status = 'Status is required';

    if (Object.keys(errors).length > 0) {
        // Send back old data and error messages
       return res.render('adminView/registerDoctor', {name,email,contact,speci,exp,status,errors});
    }


    let adminUserid = req.session.cur_user.user_id; // Get the admin user ID from the session
   let admin=await userSer.getAdmin(adminUserid);
   let adminId = admin.admin_id; // Get the admin ID from the admin object
    let result = await doctorSer.registerDoctor(name, email, contact, speci, exp, status, adminId);
>>>>>>> backendWork
    if (typeof result === "object" && result.affectedRows > 0) {
       req.session.successMessage = "Doctor registered successfully!";
        res.redirect("/registerDoctor");
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}



exports.updateDoctor = async (req, res) => {
    let { id, name, email, contact, speci, exp, status,uid } = req.body;
   // uid is doctors user id 
    console.log("Updating doctor with ID:", id);
    let result = await doctorSer.updateDoctor(id, name, email, contact, speci, exp, status,uid);
    console.log("Update result in cont: ", result);
    Array.isArray(result) && result.length > 0 ? 
        req.session.successMessage = "Doctor updated successfully!" : 
        req.session.successMessage = "Error while updating doctor.";
    res.redirect("/viewDoctor");
}

<<<<<<< HEAD
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
=======
exports.deleteDoctor = async (req, res) => {
    let userId = req.query.id;
    console.log("Deleting user with ID:", userId);
    try {
        let result = await userSer.deleteUser(userId);
        if (result.affectedRows > 0) {
            req.session.successMessage = "User deleted successfully!";
        } else {
            req.session.successMessage = "No user found with the given ID.";
        }
        res.redirect("/viewDoctor");
    } catch (err) {
        console.error("Error while deleting user:", err);
        res.render("error", { message: "Error while deleting user: " + err });
    }
}


//for logout 
exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).send("Unable to log out.");
    }
    res.clearCookie('connect.sid');
    res.clearCookie('userToken'); 
    res.redirect('/login');
  });
};
