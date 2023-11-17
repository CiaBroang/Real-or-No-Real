const apiUrl = 'http://localhost:3000/results';

const newQuestion = document.getElementById('newQuestion');
const correctAnswerTrue = document.getElementById('btnCorrectAnswerTrue');
const correctAnswerFalse = document.getElementById('btnCorrectAnswerFalse');
const btnAddQuestion = document.getElementById('btnAddQuestion');
const questionIdInput = document.getElementById('questionId');
const btnDeleteQuestion = document.getElementById('btnDeleteQuestion');
const btnBack = document.getElementById('btnBack');


btnAddQuestion.addEventListener('click', addQuestion);

function addQuestion() {
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

  fetch(`${apiUrl}/${questionId}`, {
      headers: {'Content-type': 'application/json'},
      method: 'DELETE'
  }).then(result => {
    alert('Your question was deleted');
  })
}

function goBack() {
  window.location.href = '/TriviaEnd.html';
};

btnBack.addEventListener('click', goBack);