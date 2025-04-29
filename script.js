let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

        // Set today's date as the default value for the date input field
        setTodayDate();

        // Set up the date picker to allow valid date selection
        const dateInput = document.getElementById("dateInput");

        // Add event listener for date selection
        dateInput.addEventListener("input", (e) => {
            const selectedDate = e.target.value;
            console.log("Selected Date: ", selectedDate); // Debugging line

            // Convert the selected date to MM/DD/YYYY format
            const formattedSelectedDate = convertToMMDDYYYY(selectedDate);
            console.log("Formatted Selected Date: ", formattedSelectedDate); // Debugging line

            // Find the lesson based on the formatted date
            const selectedLesson = lessonData.find(lesson => lesson.date === formattedSelectedDate);
            if (selectedLesson) {
                console.log("Lesson Found: ", selectedLesson); // Debugging line
                displayLesson(selectedLesson);
            } else {
                console.log("No lesson found for selected date"); // Debugging line
                clearLessonDisplay();
            }
        });

        // Trigger the input event listener manually after setting today's date
        const todayDate = document.getElementById("dateInput").value;
        const event = new Event('input');
        document.getElementById("dateInput").dispatchEvent(event);

    } catch (error) {
        console.error("Error fetching JSON data:", error);
        document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>Error loading data.</p>";
    }
}

// Set today's date as the default value in the input[type="date"]
function setTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const dd = today.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    const todayDate = `${yyyy}-${mm}-${dd}`; // Format as YYYY-MM-DD
    document.getElementById("dateInput").value = todayDate; // Set the value of the date input
}

// Convert date from YYYY-MM-DD format (from input) to MM/DD/YYYY format (to match JSON data)
function convertToMMDDYYYY(date) {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
}

// Function to display lesson details
function displayLesson(lesson) {
    document.getElementById("date").textContent = lesson.date;
    document.getElementById("we-will").textContent = "We Will: " + lesson.weWill;
    document.getElementById("i-will").textContent = "I Will: " + lesson.iWill;
    document.getElementById("eq").textContent = "EQ: " + lesson.eq;
}

// Function to clear displayed lesson details
function clearLessonDisplay() {
    document.getElementById("date").textContent = '';
    document.getElementById("we-will").textContent = '';
    document.getElementById("i-will").textContent = '';
    document.getElementById("eq").textContent = '';
}

// Initialize
document.addEventListener("DOMContentLoaded", fetchJSONData);
