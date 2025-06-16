let express =require("express");
let cookieParser=require("cookie-parser");
let routes=require("./routes/hospitalRoutes");
let adminRoutes=require("./routes/adminRoute");
require("dotenv").config();
let conn=require("./config/db");
const session = require("express-session");
let middeware=require("./middelware/hospitalMiddelware");
const authenticateMiddelware=require("./middelware/AuthenticationMiddleware");

// later add the require the models like jwtToken bcrypt
const app=express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); // Middleware to parse cookies
app.use(session({
    secret : 'your_secret_key', // Replace with a secure key in production
    resave: false,      // Don't save session if unmodified             
    saveUninitialized: true, // Save uninitialized sessions 
}));
app.use(middeware.cur_user); // Middleware to set current user in res.locals
app.use(authenticateMiddelware.authenticateToken);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.set("view engine","ejs");
app.use("/",routes);
app.use("/admin",adminRoutes);
app.listen(process.env.PORT,()=>console.log("Server stated on port "+process.env.PORT));
