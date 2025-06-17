
const room=require("../Services/Room");
const roomSer=new room();
const Nurse=require("../Services/nurse");
const nurseSer=new Nurse();

exports.receptionDash = (req,res)=>{
    res.render("receptionView/receptionDefaultView");
}

exports.addRoomPage=(req,res)=>{
    let mess=req.session.succuessMessage;
    res.render("receptionView/addRoom",{errors:undefined,message:mess});
}

exports.createRoom = async(req,res)=>{
    let {roomNo,type,charge}=req.body;
    
    if(!roomNo || !type || !charge ){
        res.status(400).render("receptionView/addRoom",{message:"All Room Fields are Necessary"});
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
        res.status(201).render("receptionView/viewRooms",{rooms:result});
    }catch(err){
        res.render("error",{message:err});
    }
}


exports.getRoomDetails= async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    try{
        const result=await roomSer.roomDetails(id);
        console.log("room details",result);
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
        console.log("the result in update ",result);
        res.status(201).json({data:result,message:"room updated successfully"});

    }catch(err){
        res.status(400).render("error",{message:err});
    }
}

exports.deleteRoom= async(req,res)=>{
    let id=req.params.id;
    console.log("id in del",id);
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
    res.render("receptionView/addNurse",{shift:undefined,errors:undefined,message:mess});
}

exports.createNurse=async (req,res)=>{
    let {name,contact,shift}=req.body;
    try{
        const result=await nurseSer.createNurse(name,contact,shift);
        console.log("the result of cn ",result);
        if(typeof result==="object")
            res.status(201).send(result);
        else
            res.render("error",{message:result});
    }catch(err){
        res.render("error",{message:result});
    }
}

exports.listNurse=async (req,res)=>{
    try{
        const result=await nurseSer.listNurse();
        console.log("result ln ",result);
        res.status(201).send(result);

    }catch(err){
        res.render("error",{message:err});
    }
}

exports.nurseDetails=async (req,res)=>{
    let id=req.params.id;
    try{
        const result=await nurseSer.nurseDetails(id);
        console.log("the result of nd ", result);
        res.status(200).send(result);
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.updateNurse = async (req,res)=>{
    let id=req.params.id;
    let {name,contact,shift}=req.body;
    try{
        const result=await nurseSer.updateNurse(id,name,contact,shift);
        console.log("this is result of un ",result);
        res.status(201).json({data:result});
    }catch(err){
        res.render("error",{message:err});
    }

}

exports.deleteNurse=async (req,res)=>{
    let id=req.params.id;
    try{
        const result=await nurseSer.deleteNurse(id);
        console.log("this is result of dn ",result);
        res.status(200).json({data:result});
    }catch(err){
        res.render("error",{message:err});
    }
}

exports.searchNurse = async (req,res)=>{
    let val=req.query.val;
    console.log("this val in sn ",val);
    try{
        const result=await nurseSer.searchNurse(val);
        console.log("this is sn result ",result);
        res.status(201).send(result);
    }catch(err){
        res.render("error",{message:err});   
    }
}

