let express =require("express");
let cookie=require("cookie-parser");
let routes=require("./routes/hospitalRoutes");
require("dotenv").config();
let conn=require("./config/db");
const session = require("express-session");
// later add the require the models like jwtToken bcrypt
const app=express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookie());
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,}));

app.set("view engine",".ejs");
app.use("/",routes);
app.listen(process.env.PORT,()=>console.log("Server stated on port "+process.env.PORT));
