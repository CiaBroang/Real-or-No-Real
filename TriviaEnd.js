// Slutskärm med olika val och high score

const username = document.getElementById('username');
const highScoresList = document.getElementById('highScoresList');
const btnSaveScore = document.getElementById('btnSaveScore');

const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('finalScore');
finalScore.innerText = mostRecentScore;

const totalQuestionCount = document.getElementById('totalQuestionCount');
const mostRecentQuestionCount = sessionStorage.getItem('totalQuestionCount');
totalQuestionCount.innerText = mostRecentQuestionCount;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

//PIE CHART

var chrt = document.getElementById("chartId").getContext("2d");
      var chartId = new Chart(chrt, {
         type: 'pie',
         data: {
            labels: ["CORRECT", "INCORRECT"],
            datasets: [{
               label: "Chart",
              data: [mostRecentScore, mostRecentQuestionCount - mostRecentScore],
               backgroundColor: ["#90EE90", '#ED4337'],
               hoverOffset: 5
            }],
         },
         options: {
            responsive: true,
         },
      });

//SAVE HIGH SCORE

username.addEventListener('keyup', () => {
    btnSaveScore.disabled = !username.value;
});

saveHighScore = () => {
  const score = {
    name: username.value,
    score: mostRecentScore
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="userNameScore">${score.name} - ${score.score}</li>`;
    })
    .join("");
};

btnSaveScore.addEventListener('click', saveHighScore);

btnRestartQuiz.addEventListener('click', function restartQuiz() {
   window.location.href = '/Trivia.html';
});

btnAdmin.addEventListener('click', function admin() {
   window.location.href = '/TriviaAdmin.html';
});
