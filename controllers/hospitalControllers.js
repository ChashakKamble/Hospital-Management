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
                req.session.admin=decoded;
                // If token is valid, redirect to the appropriate dashboard
                if (decoded.role === "Admin") {
                  res.redirect("/adminDash");
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
        req.session.admin = user; // Store user in session
        if (role === "Admin") {
           res.redirect("/adminDash");
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
    // use token to get the admin id
     // assuming adminid is stored in session

   // let admin=await userSer.getAdmin(adminUserid);
  //  console.log("Admin ID:", admin);
    let result = await doctorSer.registerDoctor(name, email, contact, speci, exp, status, null);
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
    if (typeof result === "object" && result.affectedRows > 0) {
        req.session.successMessage = "Doctor updated successfully!";
        res.redirect("/viewDoctor");
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
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
