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
    },];
// first initializing the dom elements
const question = document.querySelector('.question');
const ansBtns = document.querySelectorAll('.ans');
const next = document.querySelector('.next');
const score = document.querySelector('.score');
let questionIndex=0;
let scoreCount=0;
function startQuiz() {
    // setting a question
    if (questionIndex<quesAns.length) {
        question.innerHTML = quesAns[questionIndex].question;  
        // checking if the ans is correct
        function checkAns(e) {
            let clickedBtn = e.target;
            let isCorrect = clickedBtn.dataset.correct==='true';
            if(isCorrect){
                clickedBtn.classList.add('correct');
                scoreCount++;
            }
            else{
                clickedBtn.classList.add('incorrect');
            }
            // using iif to reveal instead of calling revealOthers();
            (function revealOthers (){
                ansBtns.forEach(btn=>{
                    btn.removeEventListener('click',checkAns);
                    btn.disabled=true;
                    let isCorrect = btn.dataset.correct==='true';
                    if (isCorrect) {
                        btn.classList.add('correct');
                    }
                })
            }());
            // making the next button visible and adding a function to it
            next.style.visibility='visible';
            next.addEventListener('click',handleNext);
        }
        // setting the answers
        let ansIndex = 0;
        ansBtns.forEach(btn=>{
            btn.innerHTML=quesAns[questionIndex].answers[ansIndex].text;
            btn.dataset.correct=quesAns[questionIndex].answers[ansIndex].correct;
            btn.addEventListener('click',checkAns,{once:true});
            ansIndex++;
        });
        questionIndex++;
    }
}
function flush() {
    ansBtns.forEach(btn=>{
        btn.dataset.correct='';
        btn.classList.remove('correct','incorrect');
        btn.disabled=false;
    })
}
function handleNext() {
    if (questionIndex<quesAns.length) {
        score.innerHTML ='Score: ' + scoreCount;
        flush();
        startQuiz();    
        next.innerHTML='Next'    
    }
    else{
        next.innerHTML='Play Again';
        score.innerHTML='You scored ' + scoreCount + "/" + quesAns.length;
        scoreCount=0;
        questionIndex=0;
    }
}
startQuiz();

