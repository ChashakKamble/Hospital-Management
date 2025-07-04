let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let doctorSer = new doctorService();
let ReceptionService = require("../Services/reception");
let receptionSer = new ReceptionService();
let admin=require("../Services/admin");
let adminSer=new admin();


let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");


exports.adminDefault=async(req,res)=>{
     let result=await adminSer.dashBoard();
    
    res.render("adminView/adminDefaultView",{message:"",data:result});
}

exports.docRegPage = (req, res) => {
    
    let mess=req.session.successMessage; 
    delete req.session.successMessage; // Clear the message after rendering  
    res.render("adminView/registerDoctor",{message:mess,errors:undefined,doctor:{}});
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

exports.searchDoc = async (req,res)=>{
    let val = req.query.val;
    try{
        let result=await doctorSer.searchDoc(val);
        console.log("the result of searchDoc ",result);
        if(typeof result==="object" ){
            res.send(result);
        }else{
            let allDocs = await doctorSer.getDoctors();
            res.render("adminView/viewDoctor",{doctors:allDocs,message:"Error While Searching data"});
        }
    }catch(err){
        res.render
    }
}
// there are some controllers that are needes to put here like
// createDoctor, updateDoctor, deleteDoctor, etc.




// controller for recieptionist

exports.receptionistPage = (req, res) => {
    let mess = req.session.successMessage;
    delete req.session.successMessage; // Clear the message after rendering
    res.render("adminView/registerReceptionist", {errors:undefined, message: mess,doctor:{} });
}
exports.createReceptionist = async (req, res) => {
  const { name, email, contact, role, status } = req.body;
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Name is required';
    }
    if (!email || email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (!contact || contact.trim() === '') {
        errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(contact)) {
        errors.contact = 'Contact must be a 10-digit number';
    }

    if (!role || role.trim().toLowerCase() !== 'reception') {
        errors.role = 'Role must be "Reception"';
    }

    if (!status || status.trim() === '') {
        errors.status = "Status Must Be 'Available' or 'Unavailable' ";
    }

    if (Object.keys(errors).length > 0) {
        return res.render('adminView/registerReceptionist', {errors,name,email,contact,role,status});
    }

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
    }else if(typeof result === "object" && result.length ===0) {
         res.render("adminView/viewReceptionist", { Receptionists: result, message:"No Receptionist Working Right Now" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }else{
        res.status(500).render("error", { message: "Internal Server Error" });
    }
}

exports.deleteReception = async (req, res) => {
    let userId = req.query.id;
    console.log("Deleting user with ID:", userId);
    try {
        let result = await userSer.deleteUser(userId);
        if (result.affectedRows > 0) {
            req.session.successMessage = "User deleted successfully!";
        } else {
            req.session.successMessage = "No user found with the given ID.";
        }
        res.redirect("/admin/receptions");
    } catch (err) {
        console.error("Error while deleting user:", err);
        res.render("error", { message: "Error while deleting user: " + err });
    }
}

exports.getReceptionist=async(req,res)=>{
    let id=req.query.id;
    try{
        let result=await receptionSer.getReceptionist(id);
        console.log("Receptinist returned data ",result);
        if(typeof result ==="object" && result.length>0){
            res.render("adminView/updateReceptionist",{receptionist:result[0],message:""});
        }else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
    }catch(err){
        res.render("error",{message:"Internal Message Error"});
    }

}

exports.updateReceptionist= async(req,res)=>{
    let {id,name,email,role,contact,status,userId }=req.body;
    console.log("updating reception for id ",id);
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

    // Role validation
    if (role !== 'Receptionist') {
        errors.push({ msg: "Role must be 'Receptionist'." });
    }

    // Status validation
    if (!['Active', 'Inactive', 'Available'].includes(status)) {
        errors.push({ msg: "Status must be either 'Active', 'Inactive', or 'Available'." });
    }
    status=status.trim();
    // If any validation fails
    if (errors.length > 0) {
        return res.render("updateReceptionist", {
            errors,
            receptionist: { id, name, email, contact, role, status, user_id: uid }
        });
    }

    try{
        let result=await receptionSer.updateReceptionist(id,name,email,contact,status,userId);
        console.log(result);
        Array.isArray(result) && result.length>0 ? req.session.successMessage="Receptionist Updated Successfully" :
                req.session.successMessage="Error While Updating the Receptionist";
        res.redirect("/admin/receptions");
    }catch(err){
        res.render("error",{message:"Internal Server Error"});
    }
}