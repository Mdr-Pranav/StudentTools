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

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "sgpa_" + name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const cname = "sgpa_" + name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Function to delete all SGPA cookies
function resetCookies() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].startsWith("sgpa_")) {
            const name = cookies[i].split("=")[0];
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        }
    }
    document.getElementById("inputContainer").innerHTML = "";
    document.getElementById("cgpa").innerText = "";
}

// Function to load input fields
function loadInputFields() {
    const subjectCount = parseInt(document.getElementById("semesterCount").value);
    if (isNaN(subjectCount) || subjectCount <= 0 || subjectCount > 10) {
        document.getElementById("cgpa").innerText = "Please enter a valid number of subjects (1-10).";
        return;
    }
    setCookie("subjectCount", subjectCount, 365);
    const container = document.getElementById("inputContainer");
    container.innerHTML = "";

for (let i = 1; i <= subjectCount; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `
        <br><div style="text-align: center;"><b>Subject ${i}</b></div><br>
        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
            <div>
                <label for="grade${i}">Grade:</label>
                <select id="grade${i}" onchange="saveCookie('${i}')">
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <label for="credits${i}">Credits:</label>
                <input type="number" id="credits${i}" max="5" min="0" onchange="saveCookie('${i}')" placeholder="0-5">
            </div>
        </div>`;
    container.appendChild(row);
}
loadSavedData(subjectCount);
}

// Save grade and credit values in cookies
function saveCookie(subjectIndex) {
    const grade = document.getElementById(`grade${subjectIndex}`).value;
    const credits = document.getElementById(`credits${subjectIndex}`).value;
    setCookie(`grade${subjectIndex}`, grade, 365);
    setCookie(`credits${subjectIndex}`, credits, 365);
}

// Load saved data from cookies
function loadSavedData(subjectCount) {
    for (let i = 1; i <= subjectCount; i++) {
        const savedGrade = getCookie(`grade${i}`);
        const savedCredits = getCookie(`credits${i}`);
        if (savedGrade) document.getElementById(`grade${i}`).value = savedGrade;
        if (savedCredits) document.getElementById(`credits${i}`).value = savedCredits;
    }
}

// Load initial cookie-based data
window.onload = function() {
    const savedSubjectCount = getCookie("subjectCount");
    if (savedSubjectCount) {
        document.getElementById("semesterCount").value = savedSubjectCount;
        loadInputFields();
    }
};