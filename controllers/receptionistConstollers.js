
const room=require("../Services/Room");
const roomSer=new room();

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
// add controller to load the update page

exports.updateRoom = async(req,res)=>{
    let id=req.params.id;
    let {roomNo,type,charge}=req.body;
    try{
        let result=await roomSer.UpdateRoom(id,roomNo,type,charge);
        res.status(201).send(result);

    }catch(err){
        res.status(400).render("error",{message:err});
    }
}

exports.deleteRoom= async(req,res)=>{
    let id=req.params.id;
    console.log("id in del",id);
    try{
        let result= await roomSer.deleteRoom(id);
         res.status(201).send(result);
    }catch(err){
        res.status(400).render("error",{message:err});
    }
}