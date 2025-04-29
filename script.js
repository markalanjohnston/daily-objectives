let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

        // Set up the date picker to only allow valid dates
        const dateInput = document.getElementById("dateInput");

        // Add event listener for date selection
        dateInput.addEventListener("input", (e) => {
            const selectedDate = e.target.value;
            const selectedLesson = lessonData.find(lesson => lesson.date === selectedDate);
            if (selectedLesson) {
                displayLesson(selectedLesson);
            } else {
                // If no lesson data is found, clear the displayed lesson
                clearLessonDisplay();
            }
        });

    } catch (error) {
        console.error("Error fetching JSON data:", error);
        document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>Error loading data.</p>";
    }
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
