let userService = require("../Services/userService");
let userSer =new userService();
let doctorService = require("../Services/doctorService");
let jwt=require("jsonwebtoken");
const secretKey = "this_is_a_secret_key"; // Use a secure key in production
const con = require("../config/db");
let doctorSer = new doctorService();


exports.adminDefault=(req,res)=>{
    res.render("adminView/adminDefaultView",{user:req.user,message:""});
}

exports.regiDocPage = (req, res) => {
    res.render("adminView/", { usermessage: "" });
}