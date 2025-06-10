
let userSer=require("../Services/userService");
exports.homePage=(req,res)=>{
     res.render("home");
}
exports.loginPage=(req,res)=>{
     res.render("login");
}

exports.addUser=async(req,res)=>{
     let {username,pass,role}=req.body;
     let result=await userSer.addUser(username,pass,role);
     console.log(result);
     res.send("Kuchh to hua hain");
}
