let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let doctorSer = new doctorService();
let ReceptionService = require("../Services/reception");
let receptionSer = new ReceptionService();

let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");


exports.adminDefault=async(req,res)=>{
     let allDocs=await doctorSer.getDoctors();
          
    res.render("adminView/adminDefaultView",{message:"",doctors:allDocs});
}

exports.docRegPage = (req, res) => {
    
    let mess=req.session.successMessage; 
    delete req.session.successMessage; // Clear the message after rendering  
    console.log("success message ", mess);
    res.render("adminView/registerDoctor",{message:mess});
}

exports.viewDoctor=async(req,res)=>{

    let allDocs = await doctorSer.getDoctors();
    let mess=req.session.successMessage;
    delete req.session.successMessage; // Clear the message after rendering
    res.render("adminView/viewDoctor",{doctors:allDocs,message:mess});
}

exports.getDoctor = async (req, res) => {
    let id = req.query.id;
    console.log("Fetching doctor with ID:", id);
    let result = await doctorSer.getDoctor(id);
    if (typeof result === "object" && result.length > 0) {
        res.render("adminView/updateDoctor", {doctor:result[0], message: "" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}

// there are some controllers that are needes to put here like
// createDoctor, updateDoctor, deleteDoctor, etc.




// controller for recieptionist
exports.receptionistPage = (req, res) => {
    let mess = req.session.successMessage;
    delete req.session.successMessage; // Clear the message after rendering
    res.render("adminView/registerReceptionist", { message: mess });
}
exports.createReceptionist = async (req, res) => {
    let { name, email, contact, status } = req.body;
    
    let adminUserId = res.locals.cur_user.user_id// Get the admin ID from the admin object
    let admin = await userSer.getAdmin(adminUserId);
    let adminid = admin.admin_id; // Get the admin ID from the admin object
    let result = await receptionSer.createReceptionist(name, email, contact, status, adminid);
    if (typeof result === "object" && result.affectedRows > 0) {
        req.session.successMessage = "Receptionist created successfully!";
        res.redirect("/admin/reception");
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}
exports.getAllReceptionist = async (req, res) => {
    let result = await receptionSer.getAllReceptionist();
    let mess=req.session.successMessage;
    delete req.session.successMessage;
    if (typeof result === "object" && result.length > 0) {
        res.render("adminView/viewReceptionist", { Receptionists: result, message: mess });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}