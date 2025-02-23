function setReminder() {
    let timeInput = document.getElementById("reminder-time").value;
    let reminderText = document.getElementById("reminder-text").value;
    let reminderImage = document.getElementById("reminder-image").files[0];
    
    if (!timeInput || !reminderText) {
        alert("Please enter both time and reminder note!");
        return;
    }

    let currentTime = new Date();
    let reminderTime = new Date();
    let [hours, minutes] = timeInput.split(":");
    reminderTime.setHours(hours, minutes, 0, 0);

    let timeDiff = reminderTime - currentTime;

    if (timeDiff < 0) {
        alert("Selected time is in the past. Please select a future time!");
        return;
    }

    setTimeout(() => {
        document.getElementById("alert-text").innerText = `⏰ ${reminderText} ⏰`;
        document.getElementById("alert").classList.remove("hidden");

        let alarmSound = document.getElementById("alarm-sound");
        alarmSound.play();

        if (reminderImage) {
            let imgURL = URL.createObjectURL(reminderImage);
            document.getElementById("reminder-photo").src = imgURL;
        }
    }, timeDiff);
}

function stopAlarm() {
    document.getElementById("alert").classList.add("hidden");
    let alarmSound = document.getElementById("alarm-sound");
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset audio to start
}
