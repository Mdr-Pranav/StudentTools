function calculateAttendance() {
    var attendedClasses = parseFloat(document.getElementById('attendedClasses').value);
    var totalClasses = parseFloat(document.getElementById('totalClasses').value);
    var percentage = parseFloat(document.getElementById('percentage').value);
    var a = percentage; // Change this to your desired attendance percentage
    console.log(a)
    
    let outputMessage = "";

    if (totalClasses < attendedClasses) {
        document.getElementById('output').innerHTML = outputMessage + "Are you ok?";
        return;
    }

    if (attendedClasses < totalClasses){
        if(a >=100){
            document.getElementById('output').innerHTML = outputMessage + 'Erri....';
            return;
        }
    }

    const z = attendedClasses / totalClasses;

    if (z >= a / 100) {
        let count = 0;
        while (attendedClasses / totalClasses > a / 100) {
            totalClasses = totalClasses + 1;
            if (attendedClasses / totalClasses > a / 100)
                count += 1;
        }
        if (count <= 20) {
            outputMessage += `You can bunk ${count} classes now<br>`;
        } else {
            outputMessage += "You are sorted<br>";
        }
    }

    if (z < a / 100) {
        let count = 0;
        while (attendedClasses / totalClasses < a / 100) {
            attendedClasses = attendedClasses + 1;
            totalClasses = totalClasses + 1;
            count = count + 1;
        }
        if (count <= 50) {
            outputMessage += `You should attend ${count} more classes<br>`;
        } else {
            outputMessage += "You rather dont attend any class<br>";
        }
    }

    // outputMessage += "----------------------------------------------------";
    document.getElementById('output').innerHTML = outputMessage;
}


// Calculate SGPA
function calculateSGPA() {
    const subjectCount = parseInt(document.getElementById("semesterCount").value);
    if (isNaN(subjectCount) || subjectCount <= 0) {
        document.getElementById("cgpa").innerText = "Please enter a valid number of subjects!";
        return;
    }

    const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0 };
    let totalCredits = 0;
    let num = 0;

    for (let i = 1; i <= subjectCount; i++) {
        const grade = document.getElementById(`grade${i}`).value;
        const credits = parseInt(document.getElementById(`credits${i}`).value);

        if (isNaN(credits) || credits < 0 || credits > 5) {
            document.getElementById("cgpa").innerText = "Please enter valid credits (0-5) for all subjects!";
            return;
        }

        if (grade === "F") continue;
        num += gradePoints[grade] * credits;
        totalCredits += credits;
    }

    if (totalCredits === 0) {
        document.getElementById("cgpa").innerText = "No valid grades or credits to calculate SGPA!";
        return;
    }

    const sgpa = num / totalCredits;
    document.getElementById("cgpa").innerText = "Your SGPA is: " + sgpa.toFixed(2);
}

 // Calculate CGPA
 function calculateCGPA() {
    const semesterCount = parseInt(document.getElementById("semesterCount").value);
    if (isNaN(semesterCount) || semesterCount <= 0) {
        document.getElementById("cgpa").innerText = "Please enter a valid number of semesters!";
        return;
    }

    let totalCredits = 0;
    let num = 0;

    for (let i = 1; i <= semesterCount; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa${i}`).value);
        const credits = parseInt(document.getElementById(`credits${i}`).value);

        if (isNaN(sgpa) || sgpa < 0 || sgpa > 10 || isNaN(credits) || credits < 0 || credits > 50) {
            document.getElementById("cgpa").innerText = "Please enter valid SGPA (0-10) and credits (0-50) for all semesters!";
            return;
        }

        num += sgpa * credits;
        totalCredits += credits;
    }

    if (totalCredits === 0) {
        document.getElementById("cgpa").innerText = "No valid SGPA or credits to calculate CGPA!";
        return;
    }

    const cgpa = num / totalCredits;
    document.getElementById("cgpa").innerText = "Your CGPA is: " + cgpa.toFixed(2);
}