let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");
let doctorSer = new doctorService();


exports.adminDefault=async(req,res)=>{
     let allDocs=await doctorSer.getDoctors();
     let admin=req.session.admin;    
     console.log("Admin session: ", admin); 
    res.render("adminView/adminDefaultView",{user:admin,message:"",doctors:allDocs});
}

exports.docRegPage = (req, res) => {
    let admin=req.session.admin;
    let mess=req.session.successMessage; 
    delete req.session.successMessage; // Clear the message after rendering  
    console.log("success message ", mess);
    res.render("adminView/registerDoctor",{user:admin,message:mess});
}

exports.viewDoctor=async(req,res)=>{
     let admin=req.session.admin;
    let allDocs = await doctorSer.getDoctors();
    let mess=req.session.successMessage;
    delete req.session.successMessage; // Clear the message after rendering
    res.render("adminView/viewDoctor",{user:admin,doctors:allDocs,message:mess});
}

exports.getDoctor = async (req, res) => {
    let id = req.query.id;
    console.log("Fetching doctor with ID:", id);
    let admin=req.session.admin;
    let result = await doctorSer.getDoctor(id);
    if (typeof result === "object" && result.length > 0) {
        res.render("adminView/updateDoctor", {user:admin,doctor:result[0], message: "" });
    } else if (typeof result === "string" && result.startsWith("Error")) {
        res.render("error", { message: result });
    }
}