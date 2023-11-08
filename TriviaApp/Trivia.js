
//Deklarerar variabler till elementen i html-filen.
const question = document.getElementById('question');
const btnTrue = document.getElementById('btnTrue');
const btnFalse = document.getElementById('btnFalse');
const btnNext = document.getElementById('btnNext');
const questionCount = document.getElementById('questionCount');
const timer = document.getElementById('timer');
const score = document.getElementById('score');


let totalQuestionCount = 20;
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
  btnNext.style.display = block; //kolla om detta funkar för att visa knappen
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

  if (currentQuestionIndex < questionArray.length) {
    displayQuestion();
  } else {
    alert('Nu är du klar!')
    // Alla frågor har besvarats, länka till en ny sida där resultatet ges!
  }
});



fetch(`https://opentdb.com/api.php?amount=${totalQuestionCount}&category=9&type=boolean`, {
  method: 'GET',
  headers: {
    'content-Type': 'application/json',
    // 'origin': null,
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET',
  }



})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  //Hanterar datan här
  .then(data => {
    console.log(data);  //Ta bort sen
    questionArray = data.results;
    displayQuestion(data);
  })
  .catch(error => {
    console.log('Error:', error);
  })


  //1. Kolla på det andra 2 APIern och node.js paketet https://www.npmjs.com/package/json-server https://the-trivia-api.com/docs/v2/
  //2. Kolla på att skapa egna JSON-filer https://www.npmjs.com/package/json-server https://www.youtube.com/watch?v=mAqYJF-yxO8&t=1237s 
  //3. Arbeta med storage av något slag. För VG: använd Web Storage för att lagra och återanvända minst ett värde mellan sidbelastningar, som inte är kopplat till Cities-tjänsten.
 // 4. Använd ett datavisualiseringsbibliotek som Chart.js eller liknande för att visualisera data från webbtjänsten på din webbplats.
 // 5. Lägg till yterligare en sida med html som visar upp score och knapp för att spela igen (kanske också andras score eller dina tidigare i en tabell  eller pie chart för att få med datavisualisering)