let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let doctorSer = new doctorService();

let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");

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
                    // set the session varible 
                    let doc=await doctorSer.getId(decoded.user_id);
                    req.session.docId= doc.doctor_id;
                    
                    res.redirect("/doctor");
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
            let doc=await doctorSer.getId(user.user_id);
            req.session.docId= doc.doctor_id;
            res.redirect("/doctor");
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
    let { name, email, contact, speci, exp, status } = req.body;

     const errors = {};

    // Simple validations
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!email || email.trim() === ''){ 
        errors.email = 'Email is required';
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!contact || contact.trim() === '') errors.contact = 'Contact is required';
    if (!contact || !/^\d{10}$/.test(contact)) errors.contact = 'Valid 10-digit contact number is required';
    if (!speci || speci.trim() === '') errors.speci = 'Specialization is required';
    if (!exp || exp.trim() === '') errors.exp = 'Experience is required';
    if (!status || status.trim() === '') errors.status = "Status must be either 'Available' or 'Unavailable'.";

    if (Object.keys(errors).length > 0) {
        // Send back old data and error messages
       return res.render('adminView/registerDoctor', {name,email,contact,speci,exp,status,errors});
    }


    let adminUserid = req.session.cur_user.user_id; // Get the admin user ID from the session
    let admin=await userSer.getAdmin(adminUserid);
    let adminId = admin.admin_id; // Get the admin ID from the admin object
    let result = await doctorSer.registerDoctor(name, email, contact, speci, exp, status, adminId);
    if (typeof result === "object" && result.affectedRows > 0) {
       req.session.successMessage = "Doctor registered successfully!";
        res.redirect("/registerDoctor");
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}



exports.updateDoctor = async (req, res) => {
    let { id, name, email, contact, speci, exp, status,uid } = req.body;
      const errors = [];

    // Name validation
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        errors.push({ msg: "Name is required and should contain only letters." });
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ msg: "Invalid email address." });
    }

    // Contact validation
    if (!contact || !/^[6-9]\d{9}$/.test(contact)) {
        errors.push({ msg: "Contact must be a valid 10-digit Indian number." });
    }

    // Specialization validation
    if (!speci || !/^[A-Za-z\s]+$/.test(speci)) {
        errors.push({ msg: "Specialization must contain only letters." });
    }

    // Experience validation
    exp = parseInt(exp);
    if (isNaN(exp) || exp < 0 || exp > 60) {
        errors.push({ msg: "Experience must be a number between 0 and 60." });
    }

    // Status validation
    if (!['Available', 'Unavailable'].includes(status)) {
        errors.push({ msg: "Status must be either 'Available' or 'Unavailable'." });
    }

    // If validation errors exist, re-render form with values and errors
    if (errors.length > 0) {
        return res.render("updateDoctor", {
            errors,
            doctor: { id, name, email, contact, speci, exp, status, user_id: uid }
        });
    }



    console.log("Updating doctor with ID:", id);
    let result = await doctorSer.updateDoctor(id, name, email, contact, speci, exp, status,uid);
    console.log("Update result in cont: ", result);
    Array.isArray(result) && result.length > 0 ? 
        req.session.successMessage = "Doctor updated successfully!" : 
        req.session.successMessage = "Error while updating doctor.";
    res.redirect("/viewDoctor");
}

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
