let reminders = [];

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

    let reminderId = setTimeout(() => {
        triggerAlarm(reminderText, reminderImage);
    }, timeDiff);

    // Save reminder details
    reminders.push({ id: reminderId, time: timeInput, text: reminderText });

    displayReminders();
}

function triggerAlarm(text, imageFile) {
    document.getElementById("alert-text").innerText = `⏰ ${text} ⏰`;
    document.getElementById("alert").classList.remove("hidden");

    let alarmSound = document.getElementById("alarm-sound");
    alarmSound.play();

    if (imageFile) {
        let imgURL = URL.createObjectURL(imageFile);
        document.getElementById("reminder-photo").src = imgURL;
    }
}

function stopAlarm() {
    document.getElementById("alert").classList.add("hidden");
    let alarmSound = document.getElementById("alarm-sound");
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Display all active reminders
function displayReminders() {
    let reminderList = document.getElementById("reminder-list");
    reminderList.innerHTML = "<h3>Active Reminders:</h3>";
    
    reminders.forEach((reminder, index) => {
        let reminderItem = document.createElement("div");
        reminderItem.innerHTML = `${index + 1}. 🕒 ${reminder.time} - ${reminder.text} 
            <button onclick="cancelReminder(${index})">❌ Remove</button>`;
        reminderList.appendChild(reminderItem);
    });
}

// Remove a reminder
function cancelReminder(index) {
    clearTimeout(reminders[index].id);
    reminders.splice(index, 1);
    displayReminders();
}
