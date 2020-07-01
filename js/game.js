const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let chapter = String(window.location.hash).substring(1);
let json = "../json/" + chapter + "." + "json";

let temp = [
    {
        question: "Agile: điều quan trọng hơn là xây dựng phần mềm đáp ứng được nhu cầu hiện tại của khách hàng hơn là lo lắng về các tính năng cần thiết trong tương lai:",
        choice1: "Đúng",
        choice2: "Sai",
        answer: 1
    },
    
    {
        question: "Phát triển lặp và tăng dần (iterative, incremental development) đều được vận dụng trong RUP:",
        choice1: "Đúng",
        choice2: "Sai",
        answer: 1
    },
    
    {
        question: "Mô hình phương pháp hình thức của phát triển phần mềm sử dụng phương pháp toán học để:",
        choice1: "Đúng",
        choice2: "Sai",
        answer: 2
    },
    
    {
        question: "Đâu là vấn đề của các phương pháp Agile?",
        choice1: "Quá nhiều tài liệu",
        choice2: "Để duy trì sự đơn giản cần làm thêm việc",
        choice3: "Dễ dàng duy trì hứng thú của khách hàng",
        answer: 2
    },
    
    {
        question: "Khách hàng nên tham gia như thế nào trong các phương pháp Agile?",
        choice1: "Khách hàng tham gia một cách trực tiếp trước khi bắt đầu phát triển",
        choice2: "Khách hàng nên tham gia chặt chẽ trong suốt quá trình phát triển",
        choice3: "Họ cung cấp các yêu cầu phần mềm mới trong quá trình kiểm thử",
        answer: 2
    },
    
    {
        question: "Đâu là mục tiêu của các phương pháp Agile?",
        choice1: "Giảm overheads (phí tổn phát sinh) trong qui trình phần mềm",
        choice2: "Tăng số lượng khách hàng sẽ dùng phần mềm này",
        choice3: "Tăng khả năng an ninh cho phần mềm",
        answer: 1
    },
    
    {
        question: "Đâu là sự tham gia vào kiểm thử của khách hàng trong Extreme Programming (XP)?",
        choice1: "Khách hàng tham gia vào pha kiểm thử cuối ",
        choice2: "Khách hàng là một phần của đội phát triển sẽ tham gia viết test trong khi dự án tiếp tục tiến triển",
        choice3: "Khách hàng làm việc full-time với đội phát triển như là 1 lập trình viên",
        answer: 2
    },
    
    {
        question: "Cái nào KHÔNG PHẢI tuyên ngôn của Agile?",
        choice1: "Cá nhân và tương tác quan trọng hơn qui trình và công cụ",
        choice2: "Tài liệu dễ hiểu quan trọng hơn phần mềm chạy được",
        choice3: "Hợp tác của khách hàng quan trọng hơn thương thảo hợp đồng",
        answer: 2
    },
    
    {
        question: "Đâu KHÔNG PHẢI một trong những câu hỏi mấu chốt được trả lời bởi mỗi thành viên tại mỗi cuộc họp Scrum:",
        choice1: "Bạn làm gì kể từ lần họp cuối?",
        choice2: "Bạn đang gặp trở ngại nào?",
        choice3: "Bạn đã làm được gì hôm  nay?",
        answer: 3
    },
    
    {
        question: "Trong Scrum, công việc được ưu tiên làm được nhắc đến dưới tên gọi:",
        choice1: "Tồn đọng sản phẩm (Product backlog)",
        choice2: "Lập lịch Sprint (Sprint planning)",
        choice3: "Nhìn lại Sprint (Sprint retrospective)",
        answer: 1
    },
    
    {
        question: "Đâu là bốn hoạt động khung của mô hình qui trình Extreme Programming (XP)?",
        choice1: "Lập lịch, phân tích, thiết kế, mã hóa",
        choice2: "Lập lịch, thiết kế, mã hóa, kiểm thử",
        choice3: "Lập lịch, phân tích, mã hóa, kiểm thử",
        answer: 2
    },
    
    {
        question: "Các cuộc họp Scrum được khuyến nghị tổ chức với tần suất nào?",
        choice1: "Hàng ngày",
        choice2: "2 lần một ngày (sáng và chiều)",
        choice3: "Hàng tuần",
        answer: 1
    },
    
    {
        question: "Người hay những người chịu trách nhiệm theo dõi và cập nhật cho Scrum (tương đương với người quản lý dự án) còn được gọi là ...:",
        choice1: "Scrum Master",
        choice2: "Chủ sản phẩm",
        choice3: "General Manager",
        answer: 3
    },
    
    {
        question: "Các quy trình Agile dựa trên:",
        choice1: "Phương án A và B",
        choice2: "Phát triển lặp (iterative development)",
        choice3: "Phát triển tăng dần (incremental development)",
        answer: 1
    },
    
    {
        question: "RUP là viết tắt của ... và được phát triển bởi ...:",
        choice1: "Rational Unified Program, IBM",
        choice2: "Rational Unified Process, Microsoft",
        choice3: "Rational Unified Process, IBM",
        answer: 1
    },
    
    {
        question: "RUP định nghĩa 4+1 views, như được liệt kê dưới đây:",
        choice1: "Use case view, analysis view, design view, deployment view, implementation view.",
        choice2: "Use case view, logical view, implementation view, process view and deployment view.",
        choice3: "Use case view, conceptual view, module view, code view, execution view.",
        answer: 2
    },
    
    {
        question: "Chế tác (artifact) là gì?",
        choice1: "Mô hình (model), mã (code), tài liệu (document)",
        choice2: "Sản phẩm được cung cấp bởi một nhiệm vụ của đội dự án",
        choice3: "{T1}, {T2}, và {T3}",
        choice4: "Đầu vào hay đầu ra của một hoạt động",
        answer: 3
    },
    
    {
        question: "Quy trình nào yêu cầu lập trình đôi (pair programming)?",
        choice1: "TDD",
        choice2: "Agile/XP",
        choice3: "UP/RUP",
        answer: 2
    },
    
    {
        question: "Quy trình nào chứa các pha Inception, Elaboration, Construction, & Transition?",
        choice1: "Agile",
        choice2: "UP/RUP",
        choice3: "TDD",
        answer: 2
    },
    
    {
        question: "Điều gì KHÔNG đúng về TDD?",
        choice1: "Cung cấp mã chất lượng kém",
        choice2: "Rút ngắn thời gian nhận phản hồi từ khách hàng",
        choice3: "Cung cấp bằng chứng cụ thể cho thấy phần mềm hoạt động như thế nào",
        answer: 1
    },
    
    {
        question: "Cái nào không thuộc Agile?",
        choice1: "Clean Software Development ",
        choice2: "Feature Driven Development",
        choice3: "Waterfall",
        answer: 3
    },
    
    {
        question: "Quy trình nào sử dụng sprints?",
        choice1: "TDD",
        choice2: "UP/RUP}",
        choice3: "Agile/Scrum",
        answer: 3
    },
    
    {
        question: "Quy trình nào chứa các bước theo thứ tự sau: viết test, viết code, thực hiện tests thành công, và cấu trúc lại mã.:",
        choice1: "Agile",
        choice2: "TDD",
        choice3: "UP/RUP",
        answer: 2
    }
];
console.log(JSON.stringify(temp));


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
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);        
            getNewQuestion();
        }, 1000);
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};