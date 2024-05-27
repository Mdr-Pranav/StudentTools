function calculateAttendance() {
    var attendedClasses = parseFloat(document.getElementById('attendedClasses').value);
    var totalClasses = parseFloat(document.getElementById('totalClasses').value);
    const a = 75; // Change this to your desired attendance percentage

    let outputMessage = "";

    if (totalClasses < attendedClasses) {
        document.getElementById('output').innerHTML = outputMessage + "Are you ok?";
        return;
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

const f = document.getElementById('form');
const q = document.getElementById('query');
const google = 'https://www.google.com/search?q=';
// const site = 'pagedart.com';

function submitted(event) {
  event.preventDefault();
  const url = google + '+' + q.value;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);
