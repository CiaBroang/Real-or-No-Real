const apiUrl = 'http://localhost:3000/results';

const newQuestion = document.getElementById('newQuestion');
const correctAnswerTrue = document.getElementById('btnCorrectAnswerTrue');
const correctAnswerFalse = document.getElementById('btnCorrectAnswerFalse');
const btnAddQuestion = document.getElementById('btnAddQuestion');
const questionIdInput = document.getElementById('questionId');
const btnDeleteQuestion = document.getElementById('btnDeleteQuestion');


btnAddQuestion.addEventListener('click', addQuestion);

function addQuestion() {
  // Här borde jag validera att användaren har valt true eller false som svar på sin fråga
  const selectedAnswer = btnCorrectAnswerTrue.checked ? 'True' : 'False';

  const questionData = {
    question: newQuestion.value, 
    correct_answer: selectedAnswer,
  };

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(questionData),
})
  .then(response => {
    if (response.ok) {
      alert('Your question was added');
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });
}

btnDeleteQuestion.addEventListener('click', deleteQuestion);


function deleteQuestion() {
  const questionId = Number(questionIdInput.value);

  // Använd min variabel apiUrl här
  fetch(`http://localhost:3000/results/${questionId}`, {
      headers: {'Content-type': 'application/json'},
      method: 'DELETE'
  }).then(result => {
    alert('Your question was deleted');
  })
}

// Här deklarerar jag listenern på ett annat sätt än vad jag gjort tidigare, ska kika på det
btnBack.addEventListener('click', function goBack() {
  window.location.href = '/TriviaEnd.html';
});
