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
