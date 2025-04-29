let lessonData = []; // Store JSON data globally

async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();
        lessonData = data;

        // Create the calendar grid
        createCalendar();

    } catch (error) {
        console.error("Error fetching JSON data:", error);
        document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>Error loading data.</p>";
    }
}

// Function to create and display the calendar grid
function createCalendar() {
    const calendarContainer = document.getElementById("calendar");

    // Get current month and year
    const today = new Date();
    const month = today.getMonth(); // Current month (0-11)
    const year = today.getFullYear();

    // First day of the month (to determine where the calendar starts)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate(); // Total days in current month

    // Create calendar days
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        let day = new Date(year, month, i);
        let formattedDate = formatDate(day); // Format date as "MM/DD/YYYY"
        let dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");

        // Check if there is a lesson for this date
        const hasLesson = lessonData.some(lesson => lesson.date === formattedDate);
        if (hasLesson) {
            dayElement.classList.add("highlight");
        }

        dayElement.textContent = i;
        dayElement.dataset.date = formattedDate;

        // Add click event to display lesson details
        dayElement.addEventListener("click", () => {
            const selectedDate = dayElement.dataset.date;
            const selectedLesson = lessonData.find(lesson => lesson.date === selectedDate);
            if (selectedLesson) {
                displayLesson(selectedLesson);
            }
        });

        days.push(dayElement);
    }

    // Append days to the calendar
    calendarContainer.innerHTML = ''; // Clear any previous calendar
    days.forEach(dayElement => calendarContainer.appendChild(dayElement));
}

// Format date as "MM/DD/YYYY"
function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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
