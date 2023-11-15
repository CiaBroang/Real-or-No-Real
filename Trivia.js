//Deklarerar variabler till elementen i html-filen.
const question = document.getElementById('question');
const btnTrue = document.getElementById('btnTrue');
const btnFalse = document.getElementById('btnFalse');
const btnNext = document.getElementById('btnNext');
const questionCount = document.getElementById('questionCount');
const timer = document.getElementById('timer');
const score = document.getElementById('score');


let totalQuestionCount = 3;
let currentQuestionIndex = 0;
let currentScore = 0;
let questionArray = []


//denna hittade jag på nätet
function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");
  htmlStr = htmlStr.replace(/&gt;/g , ">");
  htmlStr = htmlStr.replace(/&quot;/g , "\"");
  htmlStr = htmlStr.replace(/&#39;/g , "\'");
  htmlStr = htmlStr.replace(/&#039;/g , "\'");
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  htmlStr = htmlStr.replace(/&Aring;/g , "Å");
  return htmlStr;
}

//En funktion för att visa upp frågorna och svaren som kontent. Den första frågan är nr 1 i listan "results".
function displayQuestion() {
  const currentQuestion = questionArray[currentQuestionIndex];
  question.textContent = unEscape(currentQuestion.question); //unEscape förhindrar html versionen av vissa tecken. CurrentQuestion ger index från min array med frågor.
  questionCount.textContent = `${currentQuestionIndex + 1}/${totalQuestionCount}`;
}



function handleUserAnswer(answer, clickedBtn) {
  const currentQuestion = questionArray[currentQuestionIndex];

  if (answer === currentQuestion.correct_answer) {
    currentScore++; 
    score.textContent = currentScore;
    clickedBtn.style.backgroundColor = "#90EE90";

  } else {
    clickedBtn.style.backgroundColor = "#ED4337";
  }

  btnTrue.disabled = true;
  btnFalse.disabled = true;
  btnNext.style.display = "inline";
}



btnTrue.addEventListener('click', () => {
  handleUserAnswer('True', btnTrue);
});



btnFalse.addEventListener('click', () => {
  handleUserAnswer('False', btnFalse);
});



// Gå till nästa fråga eller avsluta om alla frågor har besvarats
btnNext.addEventListener('click', () => {
  currentQuestionIndex++;
  btnTrue.style.backgroundColor = "";
  btnFalse.style.backgroundColor = "";
  btnTrue.disabled = false;
  btnFalse.disabled = false;
  btnNext.style.display = "none";
  if (currentQuestionIndex < questionArray.length) {
    displayQuestion();

  } else {
    localStorage.setItem('finalScore', currentScore);
    sessionStorage.setItem('totalQuestionCount', totalQuestionCount);
    return window.location.assign('/TriviaEnd.html'); // Alla frågor har besvarats, redirect till min TriviaEnd sida
  }
});

fetch(`http://localhost:3000/results`, {
  method: 'GET',
  headers: {
    'content-Type': 'application/json',
  }


})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(data => {
    console.log(data);  //Ta bort sen
    questionArray = data;
    displayQuestion(data);
  })
  .catch(error => {
    console.log('Error:', error);
  })

//1. Lägg till POST och DELETE av frågor i mitt quiz API, med ett webbformulär
//2. Fixa en timer
//3. Fixa styling
//4. Visa upp scoreboard från start på TriviaEnd-sidan
//5. Lägg chart på en egen sida
//6. Fixa så att antalet för totalQuestionCount uppdateras varje gång quizet startas om