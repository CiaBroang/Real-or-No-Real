const apiUrl = 'http://localhost:3000/results';

const newQuestion = document.getElementById('newQuestion');
const correctAnswerTrue = document.getElementById('btnCorrectAnswerTrue');
const correctAnswerFalse = document.getElementById('btnCorrectAnswerFalse');
const btnAddQuestion = document.getElementById('btnAddQuestion');
const questionIdInput = document.getElementById('questionId');
const btnDeleteQuestion = document.getElementById('btnDeleteQuestion');

 // ADD QUESTION

btnAddQuestion.addEventListener('click', addQuestion);

function addQuestion() {
  console.log('Adding question!');

  const selectedAnswer = btnCorrectAnswerTrue.checked ? 'True' : 'False';

  const questionData = {
    question: newQuestion.value, 
    correct_answer: selectedAnswer,
};

console.log(questionData);

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionData),
  })
    .then(response => {
      console.log('post res', response)
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

//DELETE QUESTION

btnDeleteQuestion.addEventListener('click', deleteQuestion);


function deleteQuestion() {
  const questionId = Number(questionIdInput.value);
  console.log('Deleting question!');
  console.log(questionId);


// const questionId = {
// questionIdInput.value 
// };




fetch(`http://localhost:3000/results/${questionId}`, { //testa med variabeln apiUrl
    headers: {'Content-type': 'application/json'},
    method: 'DELETE'
}).then(result => {
    console.log(result);
    alert('Your question was deleted');
})
}

btnBack.addEventListener('click', function goBack() {
  window.location.href = '/TriviaEnd.html';
});
