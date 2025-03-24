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

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "cgpa_" + name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const cname = "cgpa_" + name + "=";
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

// Function to delete all CGPA cookies
function resetCookies() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].startsWith("cgpa_")) {
            const name = cookies[i].split("=")[0];
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        }
    }
    document.getElementById("inputContainer").innerHTML = "";
    document.getElementById("cgpa").innerText = "";
}

// Function to load input fields
function loadInputFields() {
    const semesterCount = parseInt(document.getElementById("semesterCount").value);
    if (isNaN(semesterCount) || semesterCount <= 0 || semesterCount > 10) {
        document.getElementById("cgpa").innerText = "Please enter a valid number of semesters (1-10).";
        return;
    }
    setCookie("semesterCount", semesterCount, 365);
    const container = document.getElementById("inputContainer");
    container.innerHTML = "";

    for (let i = 1; i <= semesterCount; i++) {
        const row = document.createElement("div");
        row.classList.add("subject-row");
        row.innerHTML = `
            <div class="subject-title">Semester ${i}</div>
            <div class="subject-inputs">
                <div class="subject-field">
                    <label for="sgpa${i}">SGPA</label>
                    <input type="number" id="sgpa${i}" step="0.01" min="0" max="10" onchange="saveCookie('${i}')" placeholder="0-10">
                </div>
                <div class="subject-field">
                    <label for="credits${i}">Credits</label>
                    <input type="number" id="credits${i}" max="50" min="0" onchange="saveCookie('${i}')" placeholder="0-50">
                </div>
            </div>`;
        container.appendChild(row);
    }
    loadSavedData(semesterCount);
}

// Save SGPA and credit values in cookies
function saveCookie(semesterIndex) {
    const sgpa = document.getElementById(`sgpa${semesterIndex}`).value;
    const credits = document.getElementById(`credits${semesterIndex}`).value;
    setCookie(`sgpa${semesterIndex}`, sgpa, 365);
    setCookie(`credits${semesterIndex}`, credits, 365);
}

// Load saved data from cookies
function loadSavedData(semesterCount) {
    for (let i = 1; i <= semesterCount; i++) {
        const savedSGPA = getCookie(`sgpa${i}`);
        const savedCredits = getCookie(`credits${i}`);
        if (savedSGPA) document.getElementById(`sgpa${i}`).value = savedSGPA;
        if (savedCredits) document.getElementById(`credits${i}`).value = savedCredits;
    }
}

// Load initial cookie-based data
window.onload = function() {
    const savedSemesterCount = getCookie("semesterCount");
    if (savedSemesterCount) {
        document.getElementById("semesterCount").value = savedSemesterCount;
        loadInputFields();
    }
};