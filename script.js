let chart;

async function analyzeRepo() {
    const repoUrl = document.getElementById("repoUrl").value.trim();

    if (!repoUrl) {
        alert("Please enter a GitHub repository URL.");
        return;
    }

    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);

    if (!match) {
        alert("Invalid GitHub repository URL.");
        return;
    }

    const owner = match[1];
    const repo = match[2].replace(".git", "");

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
            throw new Error("Repository not found.");
        }

        const data = await response.json();

        document.getElementById("repoName").textContent = data.name;
        document.getElementById("owner").textContent = data.owner.login;
        document.getElementById("description").textContent =
            data.description || "No description available.";

        document.getElementById("stars").textContent = data.stargazers_count;
        document.getElementById("forks").textContent = data.forks_count;
        document.getElementById("lines").textContent = data.watchers_count;
        document.getElementById("languages").textContent =
            data.language || "Unknown";
        document.getElementById("issues").textContent =
            data.open_issues_count;

        document.getElementById("files").textContent =
            (data.size / 1024).toFixed(2) + " MB";

        document.getElementById("updated").textContent =
            new Date(data.updated_at).toLocaleDateString();

        // AI Score
        let score = 50;

        if (data.stargazers_count > 100) score += 15;
        if (data.forks_count > 20) score += 10;
        if (data.watchers_count > 20) score += 10;
        if (data.open_issues_count < 10) score += 10;
        if (data.description) score += 5;

        if (score > 100) score = 100;

        document.getElementById("score").textContent = score;

        // Draw chart
        const ctx = document.getElementById("scoreChart");

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["AI Score", "Remaining"],
                datasets: [{
                    data: [score, 100 - score]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

    } catch (err) {
        alert(err.message);
    }
}
