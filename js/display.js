import {
    calculateFinalGrade,
    getAcademicStatus,
    getPerformanceRemark,
    countPassingStudents,
    calculateClassAverage,
    getTopStudent
} from "./gradeUtils.js";

export function displayStudents(students) {
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = '<div class="empty-message">No students found</div>';
        return;
    }

    students.forEach(student => {
        const { id, name, block, quiz, lab, exam } = student;
        const grade = calculateFinalGrade(student);
        const status = getAcademicStatus(grade);
        const remark = getPerformanceRemark(grade);

        const card = document.createElement("article");
        card.className = "student-card";

        card.innerHTML = `
            <div class="student-header">
                <div>
                    <h3>${name}</h3>
                    <p>${block}</p>
                </div>
                <span class="student-id">ID: ${id}</span>
            </div>

            <div class="scores">
                <div><span>Quiz</span><strong>${quiz}</strong></div>
                <div><span>Laboratory</span><strong>${lab}</strong></div>
                <div><span>Prelim Exam</span><strong>${exam}</strong></div>
            </div>

            <div class="result">
                <div><span>Final Grade</span><strong>${grade.toFixed(2)}</strong></div>
                <div><span>Academic Status</span><strong>${status}</strong></div>
                <div><span>Performance Remark</span><strong>${remark}</strong></div>
            </div>
        `;

        studentList.appendChild(card);
    });
}

export function displaySummary(students) {
    const average = calculateClassAverage(students);
    const passing = countPassingStudents(students);
    const topStudent = getTopStudent(students);

    document.getElementById("classAverage").textContent = average.toFixed(2);
    document.getElementById("passingCount").textContent = passing;
    document.getElementById("displayedCount").textContent = students.length;

    if (topStudent === null) {
        document.getElementById("topStudent").textContent = "None";
    } else {
        const topGrade = calculateFinalGrade(topStudent);
        document.getElementById("topStudent").textContent =
            `${topStudent.name} (${topGrade.toFixed(2)})`;
    }
}

export function displayMessage(message) {
    document.getElementById("messageArea").textContent = message;
}
