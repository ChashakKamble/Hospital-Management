function searchDoc( val){
    val=val.trim();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200){
            let reponce=JSON.parse(xhttp.responseText);
            let tableBody = document.querySelector("#viewDoc table tbody");
            tableBody.innerHTML = ""; // Clear existing rows
            if (reponce.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='5'>No results found</td></tr>";
            } else {
                reponce.forEach(doc => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${doc.doctor_name}</td>
                        <td>${doc.doctor_email}</td> 
                        <td>${doc.doctor_contact}</td>
                        <td>${doc.doctor_specialization}</td>
                        <td>${doc.doctor_experience}</td>
                        <td>${doc.status}</td>
                        <td>
                            <button class="btn btn-primary" onclick="updateDoc('${doc._id}')">Update</button>
                        </td> 
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    }
    xhttp.open("GET", `/searchDoc?val=${val}`, true);
    xhttp.send();
} 