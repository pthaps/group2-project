// ===== USER STATISTICS =====
const stats = {
    completedLessons: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    streak: 0
};

// ===== QUIZ DATA =====
// Add more questions here to expand each topic
const quizData = {
    phishing: {
        title: "Phishing Attacks Quiz",
        questions: [
            {
                q: "What is a common sign of a phishing email?",
                answers: [
                    "Urgent language pressuring immediate action",
                    "Proper grammar and spelling",
                    "Known sender address",
                    "Professional formatting"
                ],
                correct: 0
            },
            {
                q: "What should you do if you receive a suspicious email?",
                answers: [
                    "Click the link to verify",
                    "Reply asking if it's legitimate",
                    "Report it and delete it",
                    "Forward it to friends"
                ],
                correct: 2
            }
        ]
    },
    passwords: {
        title: "Password Security Quiz",
        questions: [
            {
                q: "What makes a password strong?",
                answers: [
                    "Using your name and birthday",
                    "Length, complexity, and uniqueness",
                    "Using common words",
                    "Keeping it short and simple"
                ],
                correct: 1
            },
            {
                q: "How often should you change important passwords?",
                answers: [
                    "Never, if they're strong",
                    "Every year",
                    "Regularly, especially after breaches",
                    "Only when required"
                ],
                correct: 2
            }
        ]
    },
    malware: {
        title: "Malware Defense Quiz",
        questions: [
            {
                q: "What is ransomware?",
                answers: [
                    "Software that encrypts files and demands payment",
                    "Free antivirus software",
                    "A type of firewall",
                    "A password manager"
                ],
                correct: 0
            }
        ]
    },
    network: {
        title: "Network Security Quiz",
        questions: [
            {
                q: "What does a VPN do?",
                answers: [
                    "Speeds up your internet",
                    "Encrypts your internet traffic",
                    "Blocks all ads",
                    "Stores passwords"
                ],
                correct: 1
            }
        ]
    },
    encryption: {
        title: "Encryption Quiz",
        questions: [
            {
                q: "What is end-to-end encryption?",
                answers: [
                    "Encryption that only works at endpoints",
                    "Messages encrypted only sender and recipient can read",
                    "Partial encryption of data",
                    "Encryption for email only"
                ],
                correct: 1
            }
        ]
    },
    social: {
        title: "Social Engineering Quiz",
        questions: [
            {
                q: "What is pretexting in social engineering?",
                answers: [
                    "Writing before an attack",
                    "Creating a fabricated scenario to obtain information",
                    "Testing security systems",
                    "Encrypting messages"
                ],
                correct: 1
            }
        ]
    }
};

// ===== EVENT LISTENERS =====
// Add click listeners to all topic cards
document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', function() {
        const topic = this.dataset.topic;
        if (quizData[topic]) {
            showQuiz(topic);
        }
    });
});

// Back button to return to topics
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('quiz-section').classList.remove('active');
    document.getElementById('topics-grid').style.display = 'grid';
});

// ===== QUIZ FUNCTIONS =====
function showQuiz(topic) {
    const quiz = quizData[topic];
    if (!quiz) return;

    // Hide topics and show quiz
    document.getElementById('topics-grid').style.display = 'none';
    document.getElementById('quiz-section').classList.add('active');
    document.getElementById('quiz-title').textContent = quiz.title;
    
    const content = document.getElementById('quiz-content');
    content.innerHTML = '';

    // Generate quiz questions
    quiz.questions.forEach((q, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>Question ${idx + 1}: ${q.q}</h3>`;
        
        // Create answer buttons
        q.answers.forEach((answer, ansIdx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer;
            btn.addEventListener('click', function() {
                checkAnswer(this, ansIdx === q.correct, topic);
            });
            questionDiv.appendChild(btn);
        });
        
        content.appendChild(questionDiv);
    });
}

function checkAnswer(btn, isCorrect, topic) {
    // Disable all buttons in this question
    const buttons = btn.parentElement.querySelectorAll('.answer-btn');
    buttons.forEach(b => b.disabled = true);
    
    stats.totalQuestions++;
    
    // Visual feedback
    if (isCorrect) {
        btn.classList.add('correct');
        stats.correctAnswers++;
    } else {
        btn.classList.add('incorrect');
    }
    
    updateStats();
    updateProgress(topic);
}

// ===== UPDATE FUNCTIONS =====
function updateStats() {
    // Calculate and update average score
    if (stats.totalQuestions > 0) {
        const avgScore = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
        document.getElementById('quiz-score').textContent = avgScore + '%';
    }
    
    document.getElementById('completed-lessons').textContent = stats.completedLessons;
    document.getElementById('streak').textContent = stats.streak;
}

function updateProgress(topic) {
    const card = document.querySelector(`[data-topic="${topic}"]`);
    if (card) {
        const progressBar = card.querySelector('.progress-fill');
        const currentWidth = parseInt(progressBar.style.width) || 0;
        
        // Increase progress by 33% per question answered
        progressBar.style.width = Math.min(currentWidth + 33, 100) + '%';
        
        // Increment completed lessons counter on first attempt
        if (currentWidth === 0) {
            stats.completedLessons++;
            updateStats();
        }
    }
}

// ===== INITIALIZATION =====
// Set initial stats on page load
updateStats();