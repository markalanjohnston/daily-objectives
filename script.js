async function fetchJSONData() {
    try {
        // Fetch the JSON file
        const response = await fetch('lessons.json');
        const data = await response.json();

        // Get today's date in MM/DD/YYYY format
        const today = new Date().toLocaleDateString('en-US');

        // Find today's lesson in the JSON data
        const todayLesson = data.find(lesson => lesson.date === today);

        if (todayLesson) {
            document.getElementById("date").textContent = todayLesson.date;
            document.getElementById("we-will").textContent = "We Will: " + todayLesson.weWill;
            document.getElementById("i-will").textContent = "I Will: " + todayLesson.iWill;
            document.getElementById("eq").textContent = "EQ: " + todayLesson.eq;
        } else {
            document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>No data available for today.</p>";
        }
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        document.getElementById("content").innerHTML = "<p style='padding: 20px; font-size: 2rem;'>Error loading data.</p>";
    }
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
