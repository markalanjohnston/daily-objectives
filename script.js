let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

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

    } catch (error) {
        console.error("Error fetching JSON data:", error);
        document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>Error loading data.</p>";
    }
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
