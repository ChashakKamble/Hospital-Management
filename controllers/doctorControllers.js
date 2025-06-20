const patient=require("../Services/patient");
const patiSer=new patient();
const medicine=require("../Services/medicine");
const mediSer=new medicine();
const doctor=require("../Services/doctorService");
const doctorSer=new doctor();

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
    res.render("doctorView/addMedicine",{message:mess,docId:req.session.docId,errors:undefined});
}

exports.addMedicine=async(req,res)=>{
    let {name,price}=req.body;
    try{
        const result= await mediSer.addMedicine(name,price);
        console.log("result of am ",result);
        if(typeof result ==="object"){
          
            req.session.successMessage="Medicine added Succssfully";
            res.redirect("/doctor/medicine");
        }else{
            res.render("error",{message:result});
        }
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.viewMedicine=async(req,res)=>{
    console.log("get medicine is called");
    try{
        console.log("its trying")
        const result=await mediSer.getMedicine();
        console.log("get medicine result ",result);
         if(typeof result ==="object"){
            let mess=req.session.successMessage;
            delete req.session.successMessage;
            res.render("doctorView/viewMedicine",{message:mess,medicine:result,docId:req.session.docId});
         }else{
            res.render("error",{message:result});
         }
    }catch(err){
            res.render("error",{message:err});
    }
}

exports.priscriptionPage=async(req,res)=>{
    let id=req.params.id;
    try{
        
        const patient= await patiSer.getPatient(id); 
         const result=await mediSer.getMedicine();
         if(typeof result==="object")
          res.render("doctorView/addPriscription",{message:undefined,patient:patient[0],medicines:result,docId:req.session.docId});
         else
            res.render("error",{message:result});
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.addPriscription = async (req, res) => {
    try {
        const { id,note, selectedMedicines } = req.body;
        console.log('id is ',id);
        // If no medicines were selected, selectedMedicines might be undefined
        if (!selectedMedicines) {
            return res.render("error", { message: "No medicines selected" });
        }

        // Convert to array if only one checkbox is checked (Express sends it as a string)
        let selectedIds = Array.isArray(selectedMedicines)
            ? selectedMedicines
            : [selectedMedicines];

        // Creating comma-separated string
        const idString = selectedIds.join(',');

        console.log("Note:", note);
        console.log("Selected Medicine IDs (string):", idString);
        const result=await doctorSer.addPriscription(id , note ,idString);
        console.log("the result of adding priscription ",result);

        if(typeof result==="object"){
            req.session.successMessage="priscription added for patient";
            res.redirect("/doctor/patients/"+req.session.docId);
        }else{
            res.render("error",{message:result});
        }
    } catch (err) {
        res.render("error", { message: "Something went wrong "+err });
    }
};
