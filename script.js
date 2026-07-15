document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const textInput = document.getElementById("text-input");
    const result = document.getElementById("result");

    const positiveWords = [
        "good", "great", "excellent", "happy", "love",
        "awesome", "fantastic", "amazing", "nice", "wonderful"
    ];

    const negativeWords = [
        "bad", "terrible", "awful", "sad", "hate",
        "poor", "horrible", "worst", "angry", "disappointed"
    ];

    analyzeBtn.addEventListener("click", () => {
        const text = textInput.value.toLowerCase();

        if (!text.trim()) {
            result.textContent = "Please enter some text.";
            return;
        }

        let positiveScore = 0;
        let negativeScore = 0;

        positiveWords.forEach(word => {
            if (text.includes(word)) positiveScore++;
        });

        negativeWords.forEach(word => {
            if (text.includes(word)) negativeScore++;
        });

        if (positiveScore > negativeScore) {
            result.textContent = "😊 Sentiment: Positive";
        } else if (negativeScore > positiveScore) {
            result.textContent = "😞 Sentiment: Negative";
        } else {
            result.textContent = "😐 Sentiment: Neutral";
        }
    });
});
