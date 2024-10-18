//Creates the studentGrades array and adds some samples for reference
let studentGrades = [
    ["Alice", [85, 90, 78], "pass"],
    ["Bob", [60, 65, 58], "pass"],
    ["Charlie", [95, 88, 92], "pass"]
];

// Function to add a new student
function addStudent(name, grades) {
    studentGrades.push([name, grades, "pass"]);
    updateAndDisplayStudents(); // Update the table with the new student
}

// Function to calculate average grade
function calculateAverage(grades) {
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

// Function to determine status based on average
function determineStatus(average) {
    if (average > 85) return 'honor pass';
    if (average >= 70) return 'pass';
    return 'fail';
}

// Function to update students' status
function updateStudentStatuses() {
    studentGrades.forEach(student => {
        let [name, grades] = student;
        let average = calculateAverage(grades);
        
        // Update status based on grading scale
        student[2] = determineStatus(average);
    });
}

// Function to create updated student grades using map
function getUpdatedStudentGrades() {
    return studentGrades.map(student => {
        let [name, grades] = student;
        let average = calculateAverage(grades);
        let status = determineStatus(average);
        
        return [name, grades, status];
    });
}

// Function to calculate class average
function calculateClassAverage() {
    let totalGrades = updatedStudentGrades.flatMap(student => student[1]);
    return totalGrades.reduce((sum, grade) => sum + grade, 0) / totalGrades.length;
}

// Function to display student data on the HTML page
function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    
    // Clear the table body before adding new rows
    tableBody.innerHTML = '';
    
    updatedStudentGrades.forEach(student => {
        let [name, grades, status] = student;
        let row = document.createElement("tr");

        // Create and append name cell
        let nameCell = document.createElement("td");
        nameCell.textContent = name;
        row.appendChild(nameCell);

        // Create and append grades cell
        let gradesCell = document.createElement("td");
        gradesCell.textContent = grades.join(", ");
        row.appendChild(gradesCell);

        // Create and append status cell
        let statusCell = document.createElement("td");
        statusCell.textContent = status;
        row.appendChild(statusCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to display class average on the HTML page
function displayClassAverage() {
    const classAverageElement = document.getElementById("classAverage");
    let classAverage = calculateClassAverage();
    classAverageElement.textContent = `Class Average: ${classAverage.toFixed(2)}`;
}

// Function to update student statuses and display them
function updateAndDisplayStudents() {
    updateStudentStatuses(); // Update the statuses of all students
    updatedStudentGrades = getUpdatedStudentGrades(); // Refresh the updated student grades
    displayStudents(); // Display the updated students in the table
    displayClassAverage(); // Display the updated class average
}

// Initial rendering of the table and class average
let updatedStudentGrades = getUpdatedStudentGrades();
updateAndDisplayStudents();