let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

        // Populate the dropdown menu with available dates
        const dateDropdown = document.getElementById("dateDropdown");
        
        // Add default "SELECT DAY" option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "SELECT DAY";
        defaultOption.disabled = true; // Prevent selection
        defaultOption.selected = true; // Set as default
        dateDropdown.appendChild(defaultOption);

        // Add actual date options
        data.forEach(lesson => {
            const option = document.createElement("option");
            option.value = lesson.date;
            option.textContent = lesson.date;
            dateDropdown.appendChild(option);
        });

        // Add event listener for dropdown changes
        dateDropdown.addEventListener("change", (e) => {
            const selectedDate = e.target.value;
            const selectedLesson = lessonData.find(lesson => lesson.date === selectedDate);
            if (selectedLesson) {
                displayLesson(selectedLesson);
            } else {
                console.error("No data found for the selected date.");
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

// Initialize
document.addEventListener("DOMContentLoaded", fetchJSONData);
