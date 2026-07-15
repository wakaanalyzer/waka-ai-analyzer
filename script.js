document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const textInput = document.getElementById("text-input");
    const result = document.getElementById("result");
    const score = document.getElementById("score");

    const positiveWords = [
        "good","great","excellent","love","happy",
        "awesome","fantastic","amazing","nice","wonderful"
    ];

    const negativeWords = [
        "bad","terrible","awful","hate","sad",
        "poor","worst","horrible","angry","disappointed"
    ];

    analyzeBtn.addEventListener("click", () => {

        const text = textInput.value.toLowerCase();

        if(text.trim()===""){
            result.textContent="Please enter some text.";
            score.textContent="0";
            return;
        }

        let positive=0;
        let negative=0;

        positiveWords.forEach(word=>{
            if(text.includes(word)) positive++;
        });

        negativeWords.forEach(word=>{
            if(text.includes(word)) negative++;
        });

        if(positive>negative){

            result.innerHTML="😊 Positive sentiment detected";
            result.style.color="#00d084";
            score.textContent="95";

        }else if(negative>positive){

            result.innerHTML="😞 Negative sentiment detected";
            result.style.color="#ff4d4d";
            score.textContent="35";

        }else{

            result.innerHTML="😐 Neutral sentiment detected";
            result.style.color="#ffd43b";
            score.textContent="70";

        }

    });

});
