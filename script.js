const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Rome", "Berlin"],
        correctAnswer: "Paris",
        reward: 100 // Assigning a reward of $100 for this question
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        reward: 200 // Assigning a reward of $200 for this question
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
        correctAnswer: "Tokyo",
        reward: 300 // Assigning a reward of $300 for this question
    },
    {
        question: "Which mammal can fly?",
        answers: ["Rat", "Bat", "Cat", "Dog"],
        correctAnswer: "Bat",
        reward: 500 // Assigning a reward of $500 for this question
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "O2", "NaCl"],
        correctAnswer: "H2O",
        reward: 1000 // Assigning a reward of $1000 for this question
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        reward: 2000 // Assigning a reward of $2000 for this question
    },
    {
        question: "Which country is famous for kangaroos?",
        answers: ["Australia", "Canada", "Brazil", "India"],
        correctAnswer: "Australia",
        reward: 4000 // Assigning a reward of $4000 for this question
    },
    {
        question: "What is the tallest mammal?",
        answers: ["Panda", "Elephant", "Whale", "Giraffe"],
        correctAnswer: "Giraffe",
        reward: 8000 // Assigning a reward of $8000 for this question
    },
    {
        question: "What is the largest ocean?",
        answers: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean",
        reward: 16000 // Assigning a reward of $16000 for this question
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Michelangelo", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
        correctAnswer: "Leonardo da Vinci",
        reward: 32000 // Assigning a reward of $32000 for this question
    },
    {
        question: "What is the currency of Japan?",
        answers: ["Yen", "Euro", "Dollar", "Pound"],
        correctAnswer: "Yen",
        reward: 64000 // Assigning a reward of $64000 for this question
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Tomato", "Avocado", "Onion", "Lemon"],
        correctAnswer: "Avocado",
        reward: 125000 // Assigning a reward of $125000 for this question
    },
    {
        question: "Which planet is known as the 'Morning Star'?",
        answers: ["Venus", "Mars", "Jupiter", "Mercury"],
        correctAnswer: "Venus",
        reward: 250000 // Assigning a reward of $250000 for this question
    },
    {
        question: "Who developed the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        correctAnswer: "Albert Einstein",
        reward: 500000 // Assigning a reward of $500000 for this question
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Ag", "Fe", "Hg"],
        correctAnswer: "Au",
        reward: 1000000 // Assigning a reward of $1000000 for this question
    }
];



let currentQuestionIndex = 0;
let score = 0;

// Reward ladder
const rewardLadder = [
    100,    // Question 1
    200,    // Question 2
    300,    // Question 3
    500,    // Question 4
    1000,   // Question 5
    2000,   // Question 6
    4000,   // Question 7
    8000,   // Question 8
    16000,  // Question 9
    32000,  // Question 10
    64000,  // Question 11
    125000, // Question 12
    250000, // Question 13
    500000, // Question 14
    1000000 // Question 15 (Final Question)
];

// Function to display current question
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.innerHTML = `<h2>Question ${currentQuestionIndex + 1}:</h2>
                                  <p>${questions[currentQuestionIndex].question}</p>`;

    answersElement.innerHTML = "";
    questions[currentQuestionIndex].answers.forEach(answer => {
        answersElement.innerHTML += `<button onclick="checkAnswer('${answer}')">${answer}</button>`;
    });
}



function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score = questions[currentQuestionIndex].reward; 
        document.getElementById("score").innerHTML = `<h3>Score: $${score}</h3>`;
        updateRewardLadder(); 

        
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
        
            document.getElementById("question").innerHTML = "<h2>Game Over</h2>";
            document.getElementById("answers").innerHTML = `<p>Congratulations! You've won $${score}</p>`;
            document.getElementById("lifelines").style.display = "none"; // Hide lifelines
        }
    } else {
        
        if (currentQuestionIndex < 5) {
            
            score = 0;
        } else {
            // Wrong answer from question 6 onward
            score = rewardLadder[4]; // Set score to question 5 reward
        }
        
        
        document.getElementById("score").innerHTML = `<h3>Score: $${score}</h3>`;
        
    
        document.getElementById("question").innerHTML = "<h2>Game Over</h2>";
        document.getElementById("answers").innerHTML = `<p>Sorry! You've won $${score}</p>`;
        document.getElementById("lifelines").style.display = "none"; // Hide lifelines
    }
}


// Function to update reward ladder display



function updateRewardLadder() {
    const rewardLadderListItems = document.querySelectorAll("#reward li");
    
    // Remove "correct-answer" class from all list items
    rewardLadderListItems.forEach(item => {
        item.classList.remove("correct-answer");
    });

    // Add "correct-answer" class to the current question's reward
    rewardLadderListItems[currentQuestionIndex].classList.add("correct-answer");
}



// Flag to track if 50:50 lifeline has been used for the current question
let fiftyFiftyUsed = false;

// Function to use the 50:50 lifeline
function useFiftyFifty() {
    if (!fiftyFiftyUsed) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        const answers = questions[currentQuestionIndex].answers;

        
        const incorrectAnswers = answers.filter(answer => answer !== correctAnswer);
        const randomIncorrectAnswers = getRandomElements(incorrectAnswers, 2);

        
        const answerButtons = document.querySelectorAll("#answers button");
        answerButtons.forEach(button => {
            if (randomIncorrectAnswers.includes(button.textContent)) {
                button.style.display = "none";
            }
        });

        
        fiftyFiftyUsed = true;
    }
}




// Function to get random elements from an array





function getRandomElements(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}



let audienceUsed = false;

// Function to simulate "Ask the Audience" lifeline
function askAudience() {
    
    if (audienceUsed) {
        console.log("You have already used the 'Ask the Audience' lifeline for this set of questions.");
        return;
    }

    
    audienceUsed = true;

    const answers = questions[currentQuestionIndex].answers;
    const percentages = [];

    // Generate random percentage for the correct answer
    const correctAnswerIndex = answers.indexOf(questions[currentQuestionIndex].correctAnswer);
    const correctAnswerPercentage = Math.floor(Math.random() * 71) + 30; // Random percentage between 30 and 100
    percentages[correctAnswerIndex] = correctAnswerPercentage;

    // Generate random percentages for wrong answers
    let totalPercentageForWrongAnswers = 100 - correctAnswerPercentage;
    for (let i = 0; i < answers.length; i++) {
        if (i !== correctAnswerIndex) {
            const wrongAnswerPercentage = Math.floor(Math.random() * (totalPercentageForWrongAnswers / (answers.length - 1)));
            percentages[i] = wrongAnswerPercentage;
            totalPercentageForWrongAnswers -= wrongAnswerPercentage;
        }
    }

    // Assign the remaining percentage to the correct answer to ensure it has the highest percentage
    percentages[correctAnswerIndex] += totalPercentageForWrongAnswers;

    // Display the bar chart
    displayBarChart(answers, percentages);
}


  // Shuffle the percentages array to randomize wrong answer percentages
    //  shuffleArray(percentages);

//     // // Display the bar chart
//     // displayBarChart(answers, percentages);


// Function to display the bar chart
function displayBarChart(answers, percentages) {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = ""; 

    // Create bars for each answer
    for (let i = 0; i < answers.length; i++) {
        const bar = document.createElement("div");
        bar.textContent = percentages[i] + "%";
        bar.className = "bar";
        if (i === 0) {
            bar.classList.add("correct"); // Add 'correct' class for correct answer bar
        }
        bar.style.height = percentages[i] + "%";
        chartContainer.appendChild(bar);
    }
    
    // Remove the chart after 5 seconds (5000 milliseconds)
    setTimeout(function() {
        chartContainer.innerHTML = "";
    }, 8000);
}

// // Function to shuffle array elements
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }


// Function to simulate "Walk Away" lifeline
function walkAway() {
    alert("You've decided to walk away. Your final score is: $" + score);
    document.getElementById("question").innerHTML = "<h2>Game Over</h2>";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("lifelines").style.display = "none"; // Hide lifelines
}

// Initial display of the first question
displayQuestion();

// Function to move to the next question
function moveToNextQuestion() {
    // Reset 50:50 lifeline flag
    fiftyFiftyUsed = false;

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Game over, display final score
        document.getElementById("question").innerHTML = "<h2>Game Over</h2>";
        document.getElementById("answers").innerHTML = `<p>Congratulations! You've won $${score}</p>`;
        document.getElementById("lifelines").style.display = "none"; // Hide lifelines
    }
}

