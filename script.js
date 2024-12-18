let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

        // Populate the dropdown menu with available dates
        const dateDropdown = document.getElementById("dateDropdown");
        data.forEach(lesson => {
            const option = document.createElement("option");
            option.value = lesson.date;
            option.textContent = lesson.date;
            dateDropdown.appendChild(option);
        });

        // Display today's lesson initially
        const today = new Date().toLocaleDateString('en-US');
        const todayLesson = data.find(lesson => lesson.date === today);
        if (todayLesson) {
            displayLesson(todayLesson);
            dateDropdown.value = today; // Set dropdown to today's date
        } else {
            displayLesson(data[0]); // Default to first entry if no match
            dateDropdown.value = data[0].date;
        }

        // Add event listener for dropdown changes
        dateDropdown.addEventListener("change", (e) => {
            const selectedDate = e.target.value;
            const selectedLesson = lessonData.find(lesson => lesson.date === selectedDate);
            if (selectedLesson) displayLesson(selectedLesson);
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

// Refresh page every 2 hours
function setupAutoRefresh() {
    setTimeout(() => {
        window.location.reload();
    }, 7200000); // 2 hours in milliseconds
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    fetchJSONData();
    setupAutoRefresh();
});
