document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("analyze-btn");
  const input = document.getElementById("text-input");
  const result = document.getElementById("result");
  const score = document.getElementById("score");

  button.addEventListener("click", function () {

    const text = input.value.toLowerCase();

    if (text.trim() === "") {
      result.textContent = "Please enter some text.";
      score.textContent = "0";
      return;
    }

    if (
      text.includes("good") ||
      text.includes("great") ||
      text.includes("love") ||
      text.includes("awesome") ||
      text.includes("excellent") ||
      text.includes("amazing")
    ) {
      result.textContent = "😊 Positive sentiment detected";
      result.style.color = "#00d084";
      score.textContent = "95";
    }
    else if (
      text.includes("bad") ||
      text.includes("terrible") ||
      text.includes("hate") ||
      text.includes("awful") ||
      text.includes("worst")
    ) {
      result.textContent = "☹️ Negative sentiment detected";
      result.style.color = "#ff4d4d";
      score.textContent = "35";
    }
    else {
      result.textContent = "😐 Neutral sentiment detected";
      result.style.color = "#ffd43b";
      score.textContent = "70";
    }

  });

});
// AI Code Review
const reviewBtn = document.getElementById("review-btn");
const codeInput = document.getElementById("code-input");
const reviewResult = document.getElementById("review-result");

reviewBtn.addEventListener("click", function () {

    const code = codeInput.value;

    if (code.trim() === "") {
        reviewResult.textContent = "Please paste some code.";
        reviewResult.style.color = "#ffd43b";
        return;
    }

    let feedback = [];

    if (code.includes("var ")) {
        feedback.push("⚠️ Use 'let' or 'const' instead of 'var'.");
    }

    if (code.includes("console.log")) {
        feedback.push("ℹ️ Remove console.log statements before production.");
    }

    if (code.length > 500) {
        feedback.push("📏 Consider breaking this code into smaller functions.");
    }

    if (feedback.length === 0) {
        feedback.push("✅ Great! No common issues were found.");
    }

    reviewResult.innerHTML = feedback.join("<br>");
    reviewResult.style.color = "#00d084";
});
