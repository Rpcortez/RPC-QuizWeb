const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === "true"
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who sang the title song for the latest Bond film, No Time to Die?',
    answers: [
      { text: 'Adele', correct: false },
      { text: 'Sam Smith', correct: false },
      { text: 'Billie Eillsh', correct: true }
    ]
  },
  {
    question: 'Which flies a green, white, and orange (in that order) tricolor flag?',
    answers: [
      { text: 'Ireland', correct: true },
      { text: 'Ivory Coast', correct: false },
      { text: 'Italy', correct: false }
    ]
  },
  {
    question: 'What company makes the Xperia model of smartphone?',
    answers: [
      { text: 'Samsung', correct: false },
      { text: 'Sony', correct: true },
      { text: 'Nokia', correct: false }
    ]
  },
  {
    question: 'Which city is home to Brandenburg Gate?',
    answers: [
      { text: 'Vienna', correct: false },
      { text: 'Zurich', correct: false },
      { text: 'Berlin', correct: true }
    ]
  },
  {
    question: 'Which of the following is NOT a fruit?',
    answers: [
      { text: 'Rhubarb', correct: true },
      { text: 'Tomatoes', correct: false },
      { text: 'Avocados', correct: false }
    ]
  },
  {
    question: 'Where was the first example of paper money used?',
    answers: [
      { text: 'China', correct: true },
      { text: 'Turkey', correct: false },
      { text: 'Greece', correct: false }
    ]
  },
  {
    question: 'Who is generally considered the inventor of the motor car?',
    answers: [
      { text: 'Henry Ford', correct: false },
      { text: 'Karl Benz', correct: true },
      { text: 'Henry M Leland', correct: false }
    ]
  },
  {
    question: 'What number was the Apollo mission that successfully put a man on the moon for the first time in human history?',
    answers: [
      { text: 'Apollo 11', correct: true },
      { text: 'Apollo 12', correct: false },
      { text: 'Apollo 13', correct: false }
    ]
  },
  {
    question: 'Which of the following languages has the longest alphabet?',
    answers: [
      { text: 'Greek', correct: false },
      { text: 'Russian', correct: true },
      { text: 'Arabic', correct: false }
    ]
  }
]
