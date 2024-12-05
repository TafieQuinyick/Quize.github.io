// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Larger pool of questions
const questionPool = [
    {
        question: "Which programming language is known as the 'language of the web'?",
        choices: ["Python", "Java", "JavaScript", "PHP"],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0
    },
    {
        question: "Which of these is not a JavaScript framework?",
        choices: ["React", "Angular", "Django", "Vue"],
        correct: 2
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        choices: ["variable name", "v name", "let name", "var = name"],
        correct: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        choices: ["#", "//", "/* */", "Both // and /* */"],
        correct: 3
    },
    {
        question: "What is the purpose of the 'git clone' command?",
        choices: ["Create a new repository", "Copy a repository", "Delete a repository", "Update a repository"],
        correct: 1
    },
    {
        question: "What does API stand for?",
        choices: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Integration", "Advanced Process Implementation"],
        correct: 0
    },
    {
        question: "Which data structure follows the LIFO principle?",
        choices: ["Queue", "Stack", "Array", "Tree"],
        correct: 1
    },
    {
        question: "What is the primary purpose of SQL?",
        choices: ["Styling webpages", "Managing databases", "Creating animations", "Network security"],
        correct: 1
    }
];

// Select 5 random questions for each quiz
let questions = [];
function selectRandomQuestions() {
    questions = shuffleArray([...questionPool]).slice(0, 5);
}

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const retryBtn = document.getElementById('retry');
const questionNumberEl = document.getElementById('questionNumber');

function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    
    choicesEl.innerHTML = '';
    
    // Shuffle the choices for each question
    const shuffledChoices = shuffleArray([...question.choices]);
    
    // Keep track of the correct answer's new position
    const correctAnswer = question.choices[question.correct];
    question.correct = shuffledChoices.indexOf(correctAnswer);
    
    shuffledChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice fade';
        button.textContent = choice;
        button.addEventListener('click', () => checkAnswer(index));
        choicesEl.appendChild(button);
    });
    
    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    questionNumberEl.textContent = currentQuestion + 1;
}

function checkAnswer(choiceIndex) {
    const choices = document.querySelectorAll('.choice');
    const correct = questions[currentQuestion].correct;
    
    choices.forEach(choice => {
        choice.disabled = true;
    });
    
    if (choiceIndex === correct) {
        choices[choiceIndex].classList.add('correct');
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'feedback correct fade';
        score++;
    } else {
        choices[choiceIndex].classList.add('wrong');
        choices[correct].classList.add('correct');
        feedbackEl.textContent = 'Wrong! The correct answer was: ' + 
            questions[currentQuestion].choices[correct];
        feedbackEl.className = 'feedback wrong fade';
    }
    
    nextBtn.classList.remove('hidden');
}

function showResult() {
    document.querySelector('.quiz-content').classList.add('hidden');
    nextBtn.classList.add('hidden');
    resultEl.classList.remove('hidden');
    scoreEl.textContent = score;
    
    if (score === 5) {
        messageEl.textContent = "Perfect! You're a genius! 🎉";
    } else if (score >= 3) {
        messageEl.textContent = "Well done! You did great! 👏";
    } else {
        messageEl.textContent = "Keep practicing! You can do better! 💪";
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

retryBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add('hidden');
    document.querySelector('.quiz-content').classList.remove('hidden');
    selectRandomQuestions(); // Select new random questions
    showQuestion();
});

// Initialize the quiz
selectRandomQuestions();
showQuestion(); 