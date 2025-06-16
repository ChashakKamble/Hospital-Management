const jwt = require("jsonwebtoken");
const secretKey = "this_is_a_secret_key";
exports.authenticateToken=(req,res,next)=>{
    const publicPaths=["/","/login","/authenticateUser"];
    if(publicPaths.includes(req.path)) return next();

    const token = req.cookies.userToken;
    if (!token) return res.redirect("/login");

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.redirect("/login");
        req.user = user;
        next();
    });
}


