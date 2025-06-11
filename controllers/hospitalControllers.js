
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
     if(typeof result === "object" && result.affectedRows > 0){
         res.render("success", { message: "User added successfully!" });
     } else if(typeof result === "string" && result.startsWith("Username")){
         res.render("error", { message: result });
     } else
    if(typeof result === "string" && result.startsWith("Error")){
         res.render("error", { message: result });
     }
}

exports.authenticateUser=async(req,res)=>{
     let {username,pass,role}=req.body;
     let result=await userSer.authenticateUser(username,pass,role);
     if(typeof result === "object"){
         req.session.user=result;
         res.redirect("/dashboard");
     } else if(typeof result === "string" && result.startsWith("Invalid")){
         res.render("error", { message: result });
     } else if(typeof result === "string" && result.startsWith("User")){
         res.render("error", { message: result });
     } else {
         res.render("error", { message: "An unexpected error occurred." });
     }
}
