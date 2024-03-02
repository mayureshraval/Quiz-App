const quesAns = [
    {
        question: '1. Which Indian state is known as the "Scotland of the East"?',
        answers: [
            { text: 'Assam', correct: false },
            { text: 'Meghalaya', correct: true },
            { text: 'Manipur', correct: false },
            { text: 'Nagaland', correct: false },
        ]
    },
    {
        question: '2. Which Indian city is famous for its Mysore silk sarees?',
        answers: [
            { text: 'Varanasi', correct: false },
            { text: 'Kanchipuram', correct: false },
            { text: 'Mysore', correct: true },
            { text: 'Jaipur', correct: false },
        ]
    },
    {
        question: '3. Which Indian state is home to the world\'s largest river island?',
        answers: [
            { text: 'Assam', correct: true },
            { text: 'West Bengal', correct: false },
            { text: 'Manipur', correct: false },
            { text: 'Bihar', correct: false },
        ]
    },
    {
        question: '4. Which Indian city is known as the "Pink City"?',
        answers: [
            { text: 'Jodhpur', correct: false },
            { text: 'Udaipur', correct: false },
            { text: 'Bikaner', correct: false },
            { text: 'Jaipur', correct: true },
        ]
    },
    {
        question: '5. Which Indian state is famous for the dance form "Kathakali"?',
        answers: [
            { text: 'Tamil Nadu', correct: false },
            { text: 'Andhra Pradesh', correct: false },
            { text: 'Kerala', correct: true },
            { text: 'Karnataka', correct: false },
        ]
    },
    {
        question: '6. Which Indian city is known as the "Manchester of India"?',
        answers: [
            { text: 'Kolkata', correct: false },
            { text: 'Ahmedabad', correct: true },
            { text: 'Mumbai', correct: false },
            { text: 'Chennai', correct: false },
        ]
    },
    {
        question: '7. Which Indian state is home to the famous "Valley of Flowers"?',
        answers: [
            { text: 'Himachal Pradesh', correct: false },
            { text: 'Sikkim', correct: false },
            { text: 'Arunachal Pradesh', correct: false },
            { text: 'Uttarakhand', correct: true },
        ]
    },
    {
        question: '8. Which Indian city is known as the "City of Lakes"?',
        answers: [
            { text: 'Bhopal', correct: false },
            { text: 'Srinagar', correct: false },
            { text: 'Udaipur', correct: true },
            { text: 'Chandigarh', correct: false },
        ]
    },
    {
        question: '9. Which Indian state is famous for the dance form "Bharatanatyam"?',
        answers: [
            { text: 'Tamil Nadu', correct: true },
            { text: 'Karnataka', correct: false },
            { text: 'Andhra Pradesh', correct: false },
            { text: 'Kerala', correct: false },
        ]
    },
    {
        question: '10. Which Indian city is known as the "City of Joy"?',
        answers: [
            { text: 'Mumbai', correct: false },
            { text: 'Delhi', correct: false },
            { text: 'Kolkata', correct: true },
            { text: 'Chennai', correct: false },
        ]
    },
];
// Declaring variables for DOM elements
const question = document.querySelector('.question');
const ansBtns = document.querySelector('.answerbtns');
const btns = ansBtns.querySelectorAll('.ans');
const next = document.querySelector('.next');
const score = document.querySelector('.score');

// Initializing variables
let index = 0;
let scoreCount = 0;

// Function to start the quiz
function startQuiz() {
    // Setting questions
    if (index < quesAns.length) {
        question.innerHTML = quesAns[index].question;

        // Checking answer when any button is clicked.
        const checkAns = (e) => {
            let btnClicked = e.target;
            // checking the button clicked for the correct property to set a class list.
            let isCorrect = btnClicked.getAttribute('correct') === 'true';
            if (isCorrect) {
                btnClicked.classList.add('correct');
                scoreCount++;
            }
            else {
                btnClicked.classList.add('incorrect');
            }

            // Revealing other buttons and disabling them
            const revealOthers = () => {
                btns.forEach(btn => {
                    btn.removeEventListener('click', checkAns);
                    // removing the event listener when looping on the dom elements because they fire them again and messes with the score.

                    // checking each button for the correct property to add classlist to.
                    let isCorrect = btn.getAttribute('correct') === 'true';
                    if (isCorrect) {
                        btn.classList.add('correct');
                    }
                    else {
                        btn.classList.add('incorrect');
                    }
                    btn.disabled = true;
                })
            }
            revealOthers();
            // making the next button visible and adding a listener to it.
            next.style.visibility = 'visible';
            next.addEventListener('click', handleNext); 
        }

        // Setting answer text in the buttons and adding attribute correct 
        let btnsindex = 0;
        btns.forEach(btn => {
            btn.innerHTML = quesAns[index].answers[btnsindex].text;
            btn.setAttribute('correct', quesAns[index].answers[btnsindex].correct);
            btn.addEventListener('click', checkAns);
            btnsindex++;
        });
        // incrementing index for next question.
        index++;
    }
}

// Function to flush the previously set classlist and enabling the buttons and clearing the correct attribute.
function flush() {
    btns.forEach(btn => {
        btn.setAttribute('correct', '');
        btn.classList.remove('correct','incorrect');
        btn.disabled = false;
    });
}

// Function to handle the next button click
function handleNext() {
    if (index < quesAns.length) {
        flush();
        startQuiz();
        next.innerHTML = 'Next';
        next.style.visibility = 'hidden';
        score.innerHTML = 'Score: ' + scoreCount;
    }
    else {
        let finalScore = scoreCount;
        next.innerHTML = 'Play Again.'
        score.innerHTML = 'Your Score: ' + finalScore + '/'+quesAns.length;
        index = 0;
        scoreCount = 0;
    }
}

// Starting the quiz
startQuiz();