
const db=require("../config/db");

exports.createRoom= async(roomNo,type, charge) =>{
    return new Promise((resolve,reject)=>{
        db.query("insert into rooms values (null,?,?,?,'Available')",[roomNo,type,charge],(err,res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        })

    });
}

exports.roomDetails= async (id)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from rooms where room_id = ?",[id],(err,res)=>{
            if(err)
                reject(err)
            else
                resolve(res);
        });
    })

}
exports.viewAllRooms = async ()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from rooms ",(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
}

exports.setUnavailable=async(id)=>{
    console.log("room id is ",id);
    return new Promise((resolve,reject)=>{
        db.query("update rooms set status='Unavailable' where room_id=?",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res);
        })
    });
}

exports.setAvailable=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("update rooms set status='Available' where room_id=?",[id],(err,res)=>{
             if(err)
                reject(err);
            else
                resolve(res);
        })
    });
}


exports.availableRooms = async()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from rooms where status='Available'",(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
}


exports.updateRoom=async (id,roomNo,type, charge)=>{
    return new Promise((resolve,reject)=>{
        db.query("update rooms set room_no=? , room_type = ? , charge_per_day=?  where room_id=?",[roomNo,type,charge,id],(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
}

exports.deleteRoom=async(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from rooms where room_id =?",[id],(err,res)=>{
            if(err)
                reject(err);
            else 
                resolve(res);
        })
    })
}

//count available rooms
exports.totalAvailableRooms= async()=>{
     return new Promise((resolve,reject)=>{
        db.query("select count(*) as rooms from rooms where status='Availabel' ",(err,res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
        })
    })
} 