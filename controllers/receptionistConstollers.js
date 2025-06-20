
const room=require("../Services/Room");
const roomSer=new room();
const Nurse=require("../Services/nurse");
const nurseSer=new Nurse();
const patient=require("../Services/patient");
const patiSer=new patient();
const doctorService = require("../Services/doctorService");
const doctorSer = new doctorService();
const bill=require("../Services/bill");
const billSer=new bill();

exports.receptionDash = (req,res)=>{
    res.render("receptionView/receptionDefaultView");
}

exports.addRoomPage=(req,res)=>{
    let mess=req.session.succuessMessage;
    delete req.session.succuessMessage;
    res.render("receptionView/addRoom",{errors:undefined,message:mess});
}

exports.createRoom = async(req,res)=>{
    const { roomNo, type, charge } = req.body;
    const errors = {};
    if (!roomNo || roomNo.trim() === '') {
        errors.roomNo = 'Room number is required';
    } else if (!/^\d+$/.test(roomNo)) {
        errors.roomNo = 'Room number must be digits only';
    }
    const allowedTypes = ['ICU', 'General Wards', 'Deluxe', 'Super Deluxe'];
    if (!type || !allowedTypes.includes(type)) {
        errors.type = 'Please select a valid room type';
    }
    if (!charge || charge.trim() === '') {
        errors.charge = 'Charges are required';
    } else if (isNaN(charge) || Number(charge) <= 0) {
        errors.charge = 'Charges must be a positive number';
    }
    if (Object.keys(errors).length > 0) {
        return res.render("receptionView/addRoom", {
            errors,
            roomNo,
            type,
            charge
        });
    }
    try{
        let result=await roomSer.createRoom(roomNo,type,charge);
        if(typeof result ==="object"){
            res.status(201).render("receptionView/addRoom",{errors:undefined,message:"Room added successfully"});
        }else if(typeof result ==="string" && result.includes("ER_DUP_ENTRY:")){
            res.status(400).render("receptionView/addRoom",{errors:undefined,message:"Can not create 2 rooms with room number "+roomNo});
        }
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.listRooms=async(req,res)=>{
    try{
        const result= await roomSer.viewAllRooms();
        let mess=req.session.succuessMessage;
        res.status(201).render("receptionView/viewRooms",{rooms:result,message:mess});
    }catch(err){
        res.render("error",{message:err});
    }
}


exports.getRoomDetails= async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    try{
        const result=await roomSer.roomDetails(id);
        res.status(201).render("receptionView/updateRoom",{room:result[0],errors:undefined});

    }catch(err){
        res.render("error",{message:err});
    }


}
exports.updateRoom = async(req,res)=>{
    let id=req.params.id;
    let {roomNo,type,charge}=req.body;
    try{
        let result=await roomSer.UpdateRoom(id,roomNo,type,charge);
        res.status(201).json({data:result,message:"room updated successfully"});

    }catch(err){
        res.status(400).render("error",{message:err});
    }
}

exports.deleteRoom= async(req,res)=>{
    let id=req.params.id;
    try{
        let result= await roomSer.deleteRoom(id);
         res.status(201).redirect("/reception/rooms");
    }catch(err){
        res.status(400).render("error",{message:err});
    }
}


// controllers  for the nures management

exports.addNursePage= (req,res)=>{
    let mess=req.session.succuessMessage;
    delete req.session.succuessMessage;
    res.render("receptionView/addNurse",{shift:undefined,errors:undefined,message:mess});
}

exports.createNurse=async (req,res)=>{  
    const { name, contact, shift } = req.body;
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Nurse name is required';
    }
        if (!contact || !/^\d{10}$/.test(contact)) {
            errors.contact = 'Valid 10-digit contact number is required';
        }
    if (!shift) {
        errors.shift = 'Shift selection is required';
    }

    if (Object.keys(errors).length > 0) {
        return res.render('receptionView/addNurse', { errors, name,contact,shift });
    }

    try{
        const result=await nurseSer.createNurse(name,contact,shift);
        console.log("the result of cn ",result);
        if(typeof result==="object"){
            req.session.succuessMessage="Nurse Updateed Successfully";
            res.status(201).redirect("/reception/nurses");
        }else{
            res.render("error",{message:result});
        }
    }catch(err){
        res.render("error",{message:result});
    }
}

exports.listNurse=async (req,res)=>{
    try{
        const result=await nurseSer.listNurse();
        let mess=req.session.succuessMessage;
        delete req.session.succuessMessage;
        res.status(201).render("receptionView/viewNurse",{nurses:result,message:mess});

    }catch(err){
        res.render("error",{message:err});
    }
}

exports.nurseDetails=async (req,res)=>{
    let id=req.params.id;
    console.log("update nurse id ",id);
    try{
        const result=await nurseSer.nurseDetails(id);
        res.status(200).render("receptionView/updateNurse",{nurse:result[0],errors:undefined});
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.updateNurse = async (req,res)=>{
    const {id, name, contact, shift } = req.body;
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Nurse name is required';
    }
        if (!contact || !/^\d{10}$/.test(contact)) {
            errors.contact = 'Valid 10-digit contact number is required';
        }
    if (!shift) {
        errors.shift = 'Shift selection is required';
    }

    if (Object.keys(errors).length > 0) {
        const result=await nurseSer.nurseDetails(id);
        return res.render('receptionView/updateNurse', { errors,nurse:result[0] });
    }
    
    console.log("updating nurse");
   
    try{
        const result=await nurseSer.updateNurse(id,name,contact,shift);
        res.status(201).redirect("/reception/nurses");
    }catch(err){
        res.render("error",{message:err});
    }

}   

exports.deleteNurse=async (req,res)=>{
    let id=req.params.id;
    console.log("deleting nurse "+id);
    try{
        const result=await nurseSer.deleteNurse(id);

        res.status(200).json({data:result});
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.searchNurse = async (req,res)=>{
    let val=req.query.val;

    try{
        const result=await nurseSer.searchNurse(val);
        console.log("this is sn result ",result);
        res.status(201).send(result);
    }catch(err){
        res.render("error",{message:err});   
    }
}



// controller for the patient management

exports.addPatientPage= async (req,res)=>{
    try{
         const nurses=await nurseSer.listNurse();
         const doctors=await doctorSer.getDoctors();
         const rooms=await  roomSer.viewAllRooms();

         res.render("receptionView/addPatient",{errors:undefined,gender:undefined,rooms:rooms,roomNo:undefined,nurse:undefined,doctor:undefined,status:undefined,nurses:nurses,doctors:doctors});
    }catch(err){
        res.render("error",{message : err});
    }
}

exports.createPatient=async(req,res)=>{
     let { name, age, contact, issue, roomNo, gender, admitDate, nurse, doctor, status } = req.body;
  let errors = {};

  if (!name) errors.name = "Name is required";
  if (!age || isNaN(age)) errors.age = "Valid age is required";
  if (!contact || !/^[0-9]{10}$/.test(contact)) errors.contact = "Valid 10-digit contact required";
  if (!issue) errors.issue = "Issue is required";
  if (!roomNo) errors.roomNo = "Room number is required";
  if (!gender) errors.gender = "Gender is required";
  if (!nurse) errors.nurse = "Nurse selection is required";
  if (!doctor) errors.doctor = "Doctor selection is required";
  if (!status) errors.status = "Status is required";

  try{
    const nurses=await nurseSer.listNurse();
    const doctors=await doctorSer.getDoctors();
    const rooms=await  roomSer.viewAllRooms();
  if (Object.keys(errors).length > 0) {
    return res.render("receptionView/addPatient", {
      errors,
      name, age, contact, issue, roomNo, gender, admitDate, nurse, doctor, status,
      rooms:rooms,  
      nurses: nurses,  
      doctors: doctors
    });
  }

    console.log("cp values "+name+age+gender+contact+issue+admitDate+roomNo+nurse+doctor);
    
        const  result=await  patiSer.addPatient(name,age,gender,contact,issue,admitDate,roomNo,nurse,doctor);
        if(typeof result ==="object")
            res.status(201).render("receptionView/addPatient",{errors:undefined,gender:undefined,rooms:rooms,roomNo:undefined,nurse:undefined,doctor:undefined,status:undefined,nurses:nurses,doctors:doctors,message:"Patient added Successfully"});
        else    
            res.render("error",{message:result});
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.listPatient=async(req,res)=>{
    try{
        const result=await patiSer.viewAllPatient();
        if(typeof result==="object"){
            res.status(201).render("receptionView/viewPatient",{patients:result});
        }else{
            res.render("error",{message:result});
        }
    }catch(err){
        res.render("error",{message:err});
    }
}

/// constroller for creating the bill 

exports.generateBill=async(req,res)=>{
    let id=req.params.id;
    try{
        const setDischared=await patiSer.setDischared(id);
        console.log("result of set dicharge ",setDischared);
        const addbill= await billSer.addBill(id);
        console.log("setDischared returned:", setDischared);
console.log("addbill returned:", addbill);

        if(setDischared && addbill){
            const result=await billSer.getBill(id);
          
            res.render("receptionView/generateBill",{patient:result[0],message:undefined});
        }else{
            
            res.render("error",{message:"problem in try result "});
        }
        
    }catch(err){
        res.render("error",{message:"problme in catch "+err});
    }
}
