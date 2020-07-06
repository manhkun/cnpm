const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let trueAnswer;
let questionCounter = 0;
let availableQuestions = [];
let chapter = String(window.location.hash).substring(1);
let json = "../json/" + chapter + "." + "json";

let questions = [];

fetch(json)
    .then(function(res){
        return res.json();
    })
    .then(function(loadedQuestions) {
        questions = loadedQuestions;
        console.log(questions);
        startGame();
    })
    .catch(err => {
        console.log(err);
    });
//constants
const CORRECT_BONUS = 10;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    let MAX_QUESTIONS = questions.length;
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("../view/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        console.log(choice);
        if(number == currentQuestion.answer){
            trueAnswer = choice;
            console.log(choice);
        }
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        };

        selectedChoice.parentElement.classList.add(classToApply);
        trueAnswer.parentElement.classList.add('correct');  
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);   
            trueAnswer.parentElement.classList.remove('correct');
            console.log(trueAnswer);   
            getNewQuestion();
        }, 1000);
        
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};