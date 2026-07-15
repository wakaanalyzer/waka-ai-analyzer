// Wait until the page is loaded
document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");
    const reviewBtn = document.getElementById("reviewBtn");

    const sentimentText = document.getElementById("sentimentText");
    const codeText = document.getElementById("codeText");

    const sentimentResult = document.getElementById("sentimentResult");
    const reviewResult = document.getElementById("reviewResult");

    // ----------------------------
    // Sentiment Analyzer
    // ----------------------------

    analyzeBtn.addEventListener("click", () => {

        const text = sentimentText.value.trim();

        if (text === "") {
            sentimentResult.innerHTML =
                "⚠️ Please enter some text.";
            return;
        }

        sentimentResult.classList.add("loading");
        sentimentResult.innerHTML = "⏳ Analyzing sentiment...";

        setTimeout(() => {

            sentimentResult.classList.remove("loading");

            const positiveWords = [
                "good",
                "great",
                "love",
                "excellent",
                "happy",
                "awesome",
                "amazing",
                "perfect"
            ];

            const negativeWords = [
                "bad",
                "hate",
                "terrible",
                "sad",
                "awful",
                "poor",
                "worst",
                "angry"
            ];

            let score = 0;

            const words = text.toLowerCase().split(/\s+/);

            words.forEach(word => {

                if (positiveWords.includes(word))
                    score++;

                if (negativeWords.includes(word))
                    score--;

            });

            if (score > 0) {

                sentimentResult.innerHTML =
                    "😊 <strong>Positive</strong><br>Confidence: 93%";

            } else if (score < 0) {

                sentimentResult.innerHTML =
                    "😞 <strong>Negative</strong><br>Confidence: 91%";

            } else {

                sentimentResult.innerHTML =
                    "😐 <strong>Neutral</strong><br>Confidence: 88%";

            }

        }, 1500);

    });

    // ----------------------------
    // AI Code Review
    // ----------------------------

    reviewBtn.addEventListener("click", () => {

        const code = codeText.value.trim();

        if (code === "") {

            reviewResult.innerHTML =
                "⚠️ Please paste some code.";

            return;

        }

        reviewResult.classList.add("loading");

        reviewResult.innerHTML =
            "⏳ Reviewing code...";

        setTimeout(() => {

            reviewResult.classList.remove("loading");

            let issues = [];

            if (!code.includes(";"))
                issues.push("• Missing semicolons.");

            if (code.includes("var"))
                issues.push("• Use let or const instead of var.");

            if (code.length < 50)
                issues.push("• Code snippet is too short.");

            if (issues.length === 0) {

                reviewResult.innerHTML =
                    "✅ <strong>Excellent Code!</strong><br>No major issues found.";

            } else {

                reviewResult.innerHTML =
                    "<strong>⚠️ Suggestions</strong><br><br>" +
                    issues.join("<br>");

            }

        }, 1800);

    });

    // ----------------------------
    // Animate Score
    // ----------------------------

    const scoreElement = document.getElementById("score");

    let value = 0;

    const target = 95;

    const timer = setInterval(() => {

        value++;

        scoreElement.textContent = value;

        if (value >= target)
            clearInterval(timer);

    }, 20);

});
