const mysql=require("mysql");
require("dotenv").config();
console.log(process.env.DB_DATABASE)
let con=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});
con.connect(err=>{
    if(err)
        console.log("Unable to connect Database");
    else
        console.log("Datanbase Connected Successfully");
});
module.exports=con;