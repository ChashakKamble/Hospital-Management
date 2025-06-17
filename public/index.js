


function loadUpdate(action, id) {
    console.log("Action:", action, "ID:", id);
    if (action === "update") {
      console.log("Loading update page for ID:", id);
      window.location.href = `/getDoctor/${id}`;
    }
  }

document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPage = 5;
    const table = document.querySelector("#viewDoc table tbody");
    const rows = Array.from(table.rows);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";

    function showPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        rows.forEach((row, index) => {
            row.style.display = index >= start && index < end ? "" : "none";
        });

        // Update active button
        document.querySelectorAll('.pagination button').forEach((btn, idx) => {
            btn.classList.toggle("active", idx === page - 1);
        });
    }

    // Create buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.addEventListener("click", () => showPage(i));
        if (i === 1) btn.classList.add("active");
        paginationContainer.appendChild(btn);
    }

    document.getElementById("viewDoc").appendChild(paginationContainer);
    showPage(1); // Show the first page
});

function deleteReception(id) {
    fetch(`/api/admin/reception/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Remove the deleted item from the UI
        const row = document.getElementById(`row-${id}`);
        if (row) row.remove();
    })
    .catch(error => {
        console.error('Error deleting reception:', error);
    });
}

document.querySelectorAll('.dropdown-button').forEach(button => {
  button.addEventListener('click', () => {
    const dropdown = button.parentElement;
    dropdown.classList.toggle('open');
  });
});

