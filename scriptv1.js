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
// const card = document.querySelector('.card');
const question = document.querySelector('.question');
const ansBtns = document.querySelector('.answerbtns');
const btns = ansBtns.querySelectorAll('.ans');
const next = document.querySelector('.next');
const score = document.querySelector('.score');

let index = 0;
let scoreCount =0;
// console.log(scoreCount);
function startQuiz() {
    // setting questions
    if (index < quesAns.length) {
        question.innerHTML = quesAns[index].question;
        
        // checking ans when any button is clicked.
        const checkAns = (e) => {
            let btnClicked = e.target;
            // console.log(btnClicked);
            let isCorrect = btnClicked.getAttribute('correct') === 'true';
            // yeh sirf ek baar call hora hai aur yeh current jo button click hua hai uska data lara hai 
            if (isCorrect) {
                // console.log(scoreCount);
                btnClicked.classList.add('correct');
                scoreCount++;
                // console.log(scoreCount);
            }
            else {
                btnClicked.classList.add('incorrect');
            }
            const revealOthers = () => {
                btns.forEach(btn => {
                    // uslie yahape bhi har ek button ka correct attribute check karna padega warna woh pehle wale ka hi lega
                    // when we iterate over buttons it fires their event listeners that's why I have to remove the event listener here, and that fixes the issue with the score being wrong.
                    btn.removeEventListener('click',checkAns);
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

            next.style.visibility = 'visible';
            next.addEventListener('click', handleNext);
        }
        // setting ans text in the btns and adding attribute correct 
        let btnsindex = 0;
        btns.forEach(btn => {
            btn.innerHTML = quesAns[index].answers[btnsindex].text;
            btn.setAttribute('correct', quesAns[index].answers[btnsindex].correct);
            btn.addEventListener('click', checkAns);
            btnsindex++;
        });

        index++;
    }
}
// removing previously set classlist and enabling the buttons and clearing the correct attribute.
function flush() {
    btns.forEach(btn => {
        btn.setAttribute('correct', '');
        btn.classList.remove('correct');
        btn.classList.remove('incorrect');
        btn.disabled=false;
    });
}

function handleNext() {
    console.log(scoreCount);
    if (index<quesAns.length) {
        flush();
        startQuiz();
        next.innerHTML='Next';
        next.style.visibility='hidden';
        score.innerHTML='Score: ' + scoreCount;
    }
    else{
        let finalScore= scoreCount;
        next.innerHTML='Play Again.'
        score.innerHTML='Your Score: '+ finalScore +'/10';
        index=0;
        scoreCount=0;
    }
    
}

startQuiz();

//   loop for printing the correct ans
// quesAns.forEach(obj=>{
//     let index=0;
//     if (obj.answers[index].correct===true) {
//         console.log(obj.answers[index]);
//         index++;
//     }
// })