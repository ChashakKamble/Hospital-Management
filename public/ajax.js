

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
