

function searchDoc( val){
    
    val=val.trim();
     let xhttp = new XMLHttpRequest();
     let url = "";
    if (val === "") {
        url = "/getDoctor";
    } else {
        url = `/admin/searchDoc?val=${encodeURIComponent(val)}`;
    }
   
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200){
            let responce=JSON.parse(xhttp.responseText);
            let tableBody = document.querySelector("#viewDoc table tbody");
            tableBody.innerHTML = ""; // Clear existing rows
            if (responce.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='5'>No results found</td></tr>";
            } else {
                responce.forEach(doc => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${doc.doctor_name}</td>
                        <td>${doc.doctor_email}</td> 
                        <td>${doc.doctor_contact}</td>
                        <td>${doc.doctor_specialization}</td>
                        <td>${doc.doctor_experience}</td>
                        <td>${doc.status}</td>
                        <td>
                             <a class="update" href='/getDoctor/?id=${doc.doctor_id}'>Update</a>
                            
                        </td> 
                        <td>
                             <a  class="delete" href='/deleteDoctor/?id=${doc.user_id}'>Delete</a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    }
    xhttp.open("GET", `/admin/searchDoc?val=${val}`, true);
    xhttp.send();
} 


document.getElementById("updateRoomForm").addEventListener("submit",async function(e){
    e.preventDefault();

    // get the values in form fields
    let id=document.getElementById("roomId").value;
    let roomNo=document.getElementById("roomNo").value;
    let type=document.getElementById("type").value;
    let charge=document.getElementById("charge").value;
    
    console.log("values are "+id+roomNo+type+charge);

    try{
        const response= await fetch("/reception/room/"+id,{
            method:"put",
            headers:{
              "content-type":"application/json"  
            },
            body:JSON.stringify({id,roomNo,type,charge }),

        });
        const result=await response.json();
        alert("Room Updated Successfully");
        window.location.href="/reception/rooms";
    }catch(err){
        console.log("the error is as follow : "+err);
        alert("unable to update room");
        window.location.href="/reception/rooms";
    }

});

async function deleteRoom(id){
    console.log("function called delete");
    const response=await fetch("/reception/room/"+id,{
        method:"delete",
       
    });
    try{
        if(response){
            window.location.href="/reception/rooms";
            alert("Room Deleted Successfully");
        }else{
            alert("Unable To Delete Room");
        }
    }catch(err){
        alert("Error While deleting room ");
    }
}




async function deleteNurse(id){
    const response=await fetch("/reception/nurse/"+id,{
        method:"delete"
    });
     try{
        if(response){
            window.location.href="/reception/nurses";
            alert("Nurse Deleted Successfully");
        }else{
            alert("Unable To Delete Nurse");
        }
    }catch(err){
        alert("Error While deleting Nurse ");
    }
}


    alert("%%");
    document.getElementById("updateNurseForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("initiating update");

        let id = document.getElementById("nurseId").value;
        let name = document.getElementById("nurseName").value;
        let contact = document.getElementById("nurseContact").value;
        let shift = document.getElementById("nurseShift").value;

        try {
            const response = await fetch("/reception/nurse/"+id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, name, contact, shift })
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Failed to update");

            alert("Nurse Details Updated Successfully");
            window.location.href = "/reception/nurses";
        } catch (err) {
            console.error("Error updating nurse:", err);
            alert("Unable to update nurse details");
            window.location.href = "/reception/nurses";
        }
    });