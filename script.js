const startButton = document.getElementById('start-btn')
const siguienteButton = document.getElementById('btn-siguiente')
const anteriorButton = document.getElementById('btn-anterior')
const questionContainerElement = document.getElementById('todo')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const SiButton = document.getElementById('si')
const NoButton = document.getElementById('no')
const sospechoso = document.getElementById('sospechoso')
const ok = document.getElementById('ok')
const crit1 = document.getElementById('crit1')
const crit2 = document.getElementById('crit2')
const crit3 = document.getElementById('crit3')
const crit4 = document.getElementById('crit4')
const volverButton = document.getElementById('volver-empezar')
const modalButton = document.getElementById('modal')


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modalButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


let currentQuestionIndex
let currentPreguntaIndex = 0

startButton.addEventListener('click', startGame)

anteriorButton.addEventListener('click', () => {anterior1()})
anteriorButton.addEventListener('click', () => {anterior2()})
anteriorButton.addEventListener('click', () => {anterior3()})


function anterior1() {

   if(currentPreguntaIndex != 0)
        return
   if(currentQuestionIndex > 0)
        currentQuestionIndex-=1
    questions[currentQuestionIndex].sa = 0
    if(currentQuestionIndex == 1)  // Fiebre
        preguntas[1].th = 0.2   // Dejo th de 2da pregunta como estaba
    setNextQuestion()
}

function anterior2() {

    if(currentPreguntaIndex > 0) {
        currentPreguntaIndex-=1
        showPregunta()
    }
}

function anterior3() {
    if(currentPreguntaIndex == 0 && currentQuestionIndex == 4) {
        currentQuestionIndex = 4
        currentPreguntaIndex = 0
        anteriorButton.removeEventListener('click', anterior3)
        anteriorButton.addEventListener('click', () => {anterior1()})
        setNextQuestion()
    }
}

function startGame() {
    volverButton.classList.add('hide')
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    currentPreguntaIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function getScore() {
    var sc = 0
    for (i = 0 ; i < 4 ; ++i)
        sc += questions[i].sa
    return sc
}

function getScore2() {
    var sc = 0
    for (i = 4 ; i < questions.length ; ++i)
        sc += questions[i].sa
    return sc
}

function setNextQuestion() {
    if (currentQuestionIndex > 0) {
        anteriorButton.classList.remove('hide')
    }
    questionElement.innerText = questions[currentQuestionIndex].question
    SiButton.addEventListener('click', selectAnswer)
    NoButton.addEventListener('click', selectAnswer)
    SiButton.removeEventListener('click', selectRespuesta)
    NoButton.removeEventListener('click', selectRespuesta)
}

function restart() {
    window.location.reload(true); 
}

function resetState() {
    SiButton.classList.remove('selected')
    NoButton.classList.remove('selected')
}

function selectAnswer(e) {
    const selectedButton = e.target
    console.log(currentQuestionIndex,questions.length)
        currentQuestionIndex++   
    if (selectedButton == SiButton) {
            questions[currentQuestionIndex-1].sa = questions[currentQuestionIndex-1].score
            if ((getScore() + getScore2()) >= 0.2) {
                casoSospechoso()
                volverButton.classList.remove('hide')
                volverButton.addEventListener('click', restart)
                return
            }
    }
    if (selectedButton == NoButton) {
        if ((getScore() + getScore2())>= 0.2) {
            casoSospechoso()
            volverButton.classList.remove('hide')
            volverButton.addEventListener('click', restart)
            return
        }
}
    if (currentQuestionIndex >= questions.length) {
            if (getScore() >= 0.1 && getScore() < 0.2) {
                currentPreguntaIndex = 0
                showPregunta()
                console.log("aca currentpreguntaindex=0")
                return
            } else if ((getScore() + getScore2()) >= 0.2) {
                casoSospechoso()
                volverButton.classList.remove('hide')
                volverButton.addEventListener('click', restart)
                return
            } else {
                casoOK()
                volverButton.classList.remove('hide')
                volverButton.addEventListener('click', restart)
                return
            }
    }
    setNextQuestion()
    console.log(getScore())
}

function showPregunta() {
    if (currentPreguntaIndex == 0) {
        modalButton.classList.remove('hide')
    }

    questionElement.innerText = preguntas[currentPreguntaIndex].question
    SiButton.removeEventListener('click', selectAnswer)
    NoButton.removeEventListener ('click', selectAnswer)
    SiButton.addEventListener('click', selectRespuesta)
    NoButton.addEventListener('click', selectRespuesta)
}

function selectRespuesta(e) {
    const selectedButton = e.target
    if (currentPreguntaIndex != 1) {
        modalButton.classList.add('hide')
    }
    if (selectedButton == SiButton) {
                casoSospechoso()
                volverButton.classList.remove('hide')
                volverButton.addEventListener('click', restart)
    }
    if (selectedButton == NoButton) {currentPreguntaIndex++
            if (currentPreguntaIndex >= preguntas.length) {
                casoOK()
                volverButton.classList.remove('hide')
                volverButton.addEventListener('click', restart)
            } else {
        showPregunta()
        return
        }
    } 
}

function casoSospechoso() {
    questionContainerElement.classList.add('hide')
    sospechoso.classList.remove('hide')
    console.log("CASO SOSPECHOSO")
}

function casoOK() {
    questionContainerElement.classList.add('hide')
    ok.classList.remove('hide')
    console.log("CASO OK")
}
function criterio1() {
    crit1.classList.remove('hide')
}
function criterio2() {
    crit2.classList.remove('hide')
}
function criterio3() {
    crit3.classList.remove('hide')
}
function criterio4() {
    crit4.classList.remove('hide')
}

const questions = [
    {
        question: 'Tenés perdida de olfato o perdida de gusto?',
        score: 2, sa: 0
    },
    {
        question: 'Tenés fiebre?',
        score: 0.1, sa: 0
    },
    {
        question: 'Tenés tos?',
        score: 0.1, sa: 0
    },
    {
        question: 'Tenés dolor al tragar alimentos sólidos o líquidos?',
        score: 0.1, sa: 0
    },
    {
        question: 'Tenés dificultades para respirar?',
        score: 0.1, sa: 0 
    },
    {
        question: 'Tenés dolor de cabeza?',
        score: 0.1, sa: 0 
    },
    {
        question: 'Tenés dolor muscular?',
        score: 0.1, sa: 0 
    },
    {
        question: 'Estuviste experimentando diarrea o vómitos?',
        score: 0.1, sa: 0 
    }
]

const preguntas = [
    {
        question: 'Estuviste en contacto con casos confirmados de COVID-19 en los últimos 14 días?', th: 0.2
    },
    {
        question: 'Sos personal de Salud, residente, o personal que trabaja en instituciones cerradas o de internación prolongada?', th: 0.2
    },
    {
        question: 'Sos persona escencial?', th: 10
    },
    {
        question: 'Residís en barrios populares?', th: 0.2
    },
]