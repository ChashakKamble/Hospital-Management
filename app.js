let express =require("express");
let cookie=require("cookie-parser");
let routes=require("./routes/hospitalRoutes");
// later add the require the models like jwtToken bcrypt
const app=express();
const port=4000;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookie());

app.set("view engine",".ejs");
app.use("/",routes);
app.listen(port,()=>console.log("Server stated on port "+port));
