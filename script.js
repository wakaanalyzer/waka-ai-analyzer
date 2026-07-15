async function analyzeRepo() {
    const repoUrl = document.getElementById("repoUrl").value.trim();

    if (!repoUrl) {
        alert("Please enter a GitHub repository URL.");
        return;
    }

    // Extract owner and repository name
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

        // Repository statistics
        document.getElementById("files").textContent =
            `${(data.size / 1024).toFixed(2)} MB`;

        document.getElementById("lines").textContent =
            data.watchers_count;

        document.getElementById("languages").textContent =
            data.language || "Unknown";

        document.getElementById("issues").textContent =
            data.open_issues_count;

        // AI Score Calculation
        let score = 50;

        if (data.stargazers_count > 10) score += 10;
        if (data.watchers_count > 5) score += 10;
        if (data.forks_count > 5) score += 10;
        if (data.open_issues_count < 10) score += 10;
        if (data.language) score += 10;

        if (score > 100) score = 100;

        document.getElementById("score").textContent = score;

    } catch (error) {
        alert(error.message);
    }
}
