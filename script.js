document.addEventListener("DOMContentLoaded", () => {
    const csvUrl = "data.csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split(","));
            const today = new Date().toLocaleDateString("en-US");
            
            const todayLesson = rows.find(row => row[0].trim() === today);

            if (todayLesson) {
                document.getElementById("date").textContent = todayLesson[0];
                document.getElementById("we-will").textContent = todayLesson[1];
                document.getElementById("i-will").textContent = todayLesson[2];
                document.getElementById("eq").textContent = todayLesson[3];
            } else {
                document.getElementById("lesson-data").innerHTML = "<p>No data available for today.</p>";
            }
        })
        .catch(error => console.error("Error fetching the CSV file:", error));
});
