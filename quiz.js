const quizData = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean"
    },
    {
      question: "Which country is famous for its tulips and windmills?",
      answers: ["Germany", "Netherlands", "Denmark", "Belgium"],
      correctAnswer: "Netherlands"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "What is the chemical symbol for water?",
      answers: ["H2O", "CO2", "O2", "H2SO4"],
      correctAnswer: "H2O"
    },
    {
      question: "What is the tallest mountain in the world?",
      answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      correctAnswer: "Mount Everest"
    }
  ];
  
  const quizContainer = document.getElementById('quiz-container');
  let currentQuestionIndex = 0;
  
  function loadQuestion(question) {
    const cardTemplate = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${question.question}</h5>
          <div class="form-check">
            ${question.answers.map((answer, index) => `
              <input class="form-check-input" type="radio" name="answer${currentQuestionIndex}" id="answer${index}" value="${answer}">
              <label class="form-check-label" for="answer${index}">
                ${answer}
              </label><br>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    quizContainer.innerHTML = cardTemplate;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion(quizData[currentQuestionIndex]);
    } else {
      showSubmitButton();
    }
  }
  
  function showSubmitButton() {
    const submitButton = `
      <div class="row justify-content-center" style="padding-bottom: 20px;">
        <div class="col-auto">
          <button class="btn btn-primary" onclick="submitQuiz()">Submit</button>
        </div>
      </div>
    `;
    quizContainer.innerHTML = submitButton;
  }
  
  function submitQuiz() {
    let score = 0;
    quizData.forEach((question, index) => {
      const selectedAnswer = document.querySelector(`input[name="answer${index}"]:checked`);
      if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
        score++;
      }
    });
  
    let performanceMessage = '';
    if (score === quizData.length) {
      performanceMessage = 'Congratulations! You answered all questions correctly.';
    } else if (score === 0) {
      performanceMessage = 'Oops! You didn\'t get any question right. Keep learning!';
    } else {
      performanceMessage = `You scored ${score} out of ${quizData.length}. Well done!`;
    }
  
    const modalContent = `
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Quiz Submitted</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${performanceMessage}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="restartQuiz()">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    quizContainer.innerHTML = `<p>${performanceMessage}</p>`;
    
    const modal = new bootstrap.Modal(document.querySelector('.modal'));
    modal.show();
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    loadQuestion(quizData[currentQuestionIndex]);
  }
  
  loadQuestion(quizData[currentQuestionIndex]);
  