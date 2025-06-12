
// array for the list of form divs in admindashboard
const admForms = ["default-view", "addDoc", "viewDoc"];
const showForm = (formId) => {
  // Hide all forms
  admForms.forEach((form) => {
    document.getElementById(form).style.display = "none";
  });
  // Show the selected form
  document.getElementById(formId).style.display = "flex";
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

