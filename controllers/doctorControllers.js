const patient=require("../Services/patient");
const patiSer=new patient();
const medicine=require("../Services/medicine");
const mediSer=new medicine();


exports.doctorDefault=async(req,res)=>{
    res.render("doctorView/doctorDefault",{message:undefined,docId:req.session.docId});
}

exports.getAllocatedPatient = async (req,res)=>{
    let id=req.params.docId;
    console.log("getting the patient for doctor id ",id);
   
    try{
        const result=await patiSer.getAllocatedPatient(id);
        if(typeof result==="object"){
            let mess=req.session.successMessage;
            delete req.session.successMessage;
            res.status(201).render("doctorView/assignedPatient",{message:mess,patients:result,docId:req.session.docId});
        }else{    
            res.status(400).render("error",{message:result});
        }
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.setChecked= async (req,res)=>{
    let id=req.params.id;
    try{
        const result= await patiSer.setChecked(id);
        if(typeof result==="object"){
            req.session.successMessage="Patient checked by doctor ";
            res.redirect("/doctor/patients/"+req.session.docId);
        }else{
            res.render("error",{message:result});
        }      
    }catch(err){
        res.render("error",{message:err});
    }
}

// set one controller for the setting the dischage of patient


exports.addmittedPatient= async(req,res)=>{
     let id=req.params.id;
    try{
        const result=await patiSer.addmittedPatient(id);
        if(typeof result ==="object")
         res.status(200).render("doctorView/addmittedPatient",{message:undefined,patients:result,docId:req.session.docId});  
        else
            res.render("error",{message:result});
    }catch(err){
         res.render("error",{message:err});
    }
}

exports.dischargedPatient= async(req,res)=>{
     let id=req.params.id;
    try{
        const result=await patiSer.dischagedPatient(id);
        if(typeof result ==="object")
         res.status(200).render("doctorView/dischargePatient",{message:undefined,patients:result,docId:req.session.docId});  
        else
            res.render("error",{message:result});
    }catch(err){
         res.render("error",{message:err});
    }
}



// controllers for handeling the medicine options
exports.addMedicinePage=async(req,res)=>{
    let mess=req.session.successMessage;
    delete req.session.successMessage;
    res.render("doctorView/addMedicine",{message:mess});
}

exports.addMedicine=async(req,res)=>{
    let {name,price}=req.body;
    try{
        const result= await mediSer.addMedicine(name,price);
        console.log("result of am ",result);
        if(typeof result ==="object"){
          
            req.session.successMessage="Medicine added Succssfully";
            res.redirect("/doctor/add")
        }else{
            res.render("error",{message:result});
        }
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.viewMedicine=async(req,res)=>{
    try{
        const result=await mediSer.getMedicine();
        console.log("get medicine result ",result);
         if(typeof result ==="object"){
            let mess=req.session.successMessage;
            delete req.session.successMessage;
            res.render("doctorView/viewMedicine",{message:mess});
         }else{
            res.render("error",{message:result});
         }
    }catch(err){
            res.render("error",{message:err});
    }
}


