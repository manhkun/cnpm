const finalScore = document.getElementById("finalScore");
finalScore.innerText = localStorage.getItem('mostRecentScore');

function goBack(){
    window.history.back();
}