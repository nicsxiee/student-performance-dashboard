import { students } from "./students.js";

import {
    searchStudents,
    filterStudentsByBlock,
    filterStudentsByStatus
} from "./gradeUtils.js";

import {
    displayStudents,
    displaySummary,
    displayMessage
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
    const query = searchInput.value.trim();
    const selectedBlock = blockFilter.value;
    const selectedStatus = statusFilter.value;

    let filteredStudents = searchStudents(students, query);

    filteredStudents = filterStudentsByBlock(filteredStudents, selectedBlock);
    filteredStudents = filterStudentsByStatus(filteredStudents, selectedStatus);

    displayStudents(filteredStudents);
    displaySummary(filteredStudents);

    if (filteredStudents.length === 0) {
        displayMessage("No students found");
    } else {
        displayMessage("");
    }
}

function resetDashboard() {
    searchInput.value = "";
    blockFilter.value = "All";
    statusFilter.value = "All";

    displayStudents(students);
    displaySummary(students);
    displayMessage("");
}

applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetDashboard);
searchInput.addEventListener("input", applyFilters);
blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

displayStudents(students);
displaySummary(students);
displayMessage("");
