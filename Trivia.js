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

// Frågorna från API:t innehöll HTML-escapes,
// denna hittade jag på nätet
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

function displayQuestion() {
  const currentQuestion = questionArray[currentQuestionIndex];
  question.textContent = unEscape(currentQuestion.question);
  questionCount.textContent = `${currentQuestionIndex + 1}/${totalQuestionCount}`;
}

function handleUserAnswer(answer, clickedBtn) {
  const currentQuestion = questionArray[currentQuestionIndex];

  if (answer === currentQuestion.correct_answer) {
    currentScore++; 
    score.textContent = currentScore;
    const GREEN_COLOR_HEX = "#90EE90";
    clickedBtn.style.backgroundColor = GREEN_COLOR_HEX;
  } else {
    const RED_COLOR_HEX = "#ED4337";
    clickedBtn.style.backgroundColor = RED_COLOR_HEX;
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


btnNext.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionArray.length) {
    displayQuestion();
    btnTrue.style.backgroundColor = "";
    btnFalse.style.backgroundColor = "";
    btnTrue.disabled = false;
    btnFalse.disabled = false;
    btnNext.style.display = "none";
  } else {
    localStorage.setItem('finalScore', currentScore);
    sessionStorage.setItem('totalQuestionCount', totalQuestionCount);
    return window.location.assign('/TriviaEnd.html');
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
    questionArray = data;
    displayQuestion(data);
  })
  .catch(error => {
    console.log('Error:', error);
  })

// I en nästa iteration
// Visa upp scoreboard från start på TriviaEnd-sidan
// Lägg chart på en egen sida
// Fixa så att antalet för totalQuestionCount uppdateras varje gång quizet startas om, och gör en funktion för att starta om quizet med en timer
// Lägg till timer som räknar ner när quizet startar
// block till alla inputfält
// Validera att användaren har valt true eller false som svar på sin fråga
// Inloggning med lösenord till adminsidan