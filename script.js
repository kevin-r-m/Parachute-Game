
//capture form results

const submitBttn = document.querySelector('.wordSubmit')
const word = document.querySelector('#wordField')
const startGame = document.querySelector('.gameStart')

let checkArray = []

const nextInstruction = document.querySelector('.instructionsBtn')
const instructionsColumn1 = document.querySelector('#instructionsContentCol1')
const instructionsColumn2 = document.querySelector('#instructionsContentCol2')
const instructionText = document.querySelector('.instructionText')
const instructionsContent = document.querySelector('.instructionsContent')

nextInstruction.addEventListener('click', function(event){
    event.preventDefault();
    instructionsColumn1.innerText = 'Start thinking of your word and once you\'re ready, hit start game.'
    instructionsColumn2.innerText = 'While Player 1 is thinking of their word, just hang tight. You cannot look at the screen while they\'re entering the word. This is a test of honor.'
    instructionText.innerText = 'Get ready, follow the below instructions and hit Start Game'
    nextInstruction.innerText = 'Start Game'
    nextInstruction.addEventListener('click', function(event){
        event.preventDefault();
        instructionsContent.classList.add('hide')

    })
})

submitBttn.addEventListener('click', function(event){
    event.preventDefault();
    // grabbing the word entered and putting it into an array
    var charArray = Array.from(word.value)
    const specialArray = ['!','?','@','#', '%', '^','&','(',')','-', '_', '=','+','[',']','{','}','|',';',':','\'','\"',',','.','<','>','/','`','~']
    let spaceDetector = (charArray.includes(' '))
    let specialChar = specialArray.some(special => charArray.includes(special))
    if(spaceDetector === true){
        let errorMessage = document.querySelector('#error')
        errorMessage.innerText = `Woah there, you cannot use a space! Try again with out the space.`
        errorMessage.classList.remove('hide')
        errorMessage.classList.add('jitter')
        word.value = ''
        return
    }
    if (specialChar === true){
        let errorMessage = document.querySelector('#error')
        errorMessage.innerText = `Woah there, you cannot use a special character! Try again without the special character.`
        errorMessage.classList.remove('hide')
        errorMessage.classList.add('jitter')
        word.value = ''
        return
    }
    if (charArray.length === 0){
        let errorMessage = document.querySelector('#error')
        errorMessage.innerText = `Woah there, you cannot just enter nothing! Try again and use a word.`
        errorMessage.classList.remove('hide')
        errorMessage.classList.add('jitter')
        word.value = ''
        return
    }
    // Use static value to check for certain characters in new array of characters
    //Push charArray into html so it can be accessed by the user guesses
    for (let i = 0; i < charArray.length; i++) {
        let li = document.createElement('li')
        li.innerText = charArray[i].toLowerCase()
        //Adding class so it can access later in guess character submission (lines 41 - 44)
        li.classList = 'guessChars'
        li.setAttribute('data-position', i)
        li.style.opacity = 0
        let ul = document.querySelector('.guessWord')
        ul.appendChild(li)
    }
    setTimeout(function(){
        startGame.style.opacity = 0
        startGame.style.pointerEvents = 'none'
    }, 500)
    checkNode = document.querySelectorAll('.guessChars');
    checkArray = [].slice.call(checkNode);
    
    let wordLength = document.querySelector('.wordLength')
    wordLength.innerText = charArray.length
})



//User submission for letter guessed

//Need to capture the user submisson for a guess letter
const charGuess = document.querySelector('#charField')
const charSubmit = document.querySelector('.charSubmit')
//Need to grab the submitted letter after user submits
let guessArray;
let correctGuess = 0;
let availLetters;

charSubmit.addEventListener('click', function(event){
    event.preventDefault();
    const char = charGuess.value.toLowerCase()
    //Need to access HTML li elements created with initial user submission lines 18 - 23
    //Need to use the submitted letter to compare it against the array of characters for the word submitted
    charGuess.value = ''
    var correct = false
    
    guessArray = document.querySelectorAll('.guessChars');

    guessArray.forEach(guess => {
        if (guess.innerText == char){
            correct = true
            //Need to access available letters style on match
            guess.style.opacity = 1
            checkArray.splice(guess.dataset.position, 1, '$')
        }
    })
    if (correct === false){
        updateGuesses()
        endGame()
    }
    if (correct === true){
        endGame()
    }
    availLetters = document.getElementById(`${char}`)
    availLetters.classList.add('hide')
})

let guesses = 4
let rowPosition = 1

let guessesDisplay = document.querySelector('.guessesLeft')

function updateGuesses() {
    guesses -= 1
    rowPosition += 1
    guessTracking = guessesDisplay.textContent = guesses
    let paraImg = document.querySelector('.paraImg')
    paraImg.classList.add(`slide${rowPosition}`)
    guessesDisplay.style.gridRow = rowPosition
    if(guesses === 3){
        guessesDisplay.style.backgroundColor = 'rgba(255, 255, 80, 0.5)'
    }else if(guesses === 2){
        guessesDisplay.style.backgroundColor = 'rgba(255, 166, 0, 0.5)'
    }else if(guesses === 1){
        guessesDisplay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
    }
}

const endMessage = document.querySelector('.endMessage')
const endIntro = document.querySelector('.endIntro')

function endGame(){
    //win scenario
    if(checkArray.every(isMoney) === true){
        endMessage.innerText = 'Oh yea! It looks like you were able to guess the word!'
        endIntro.innerText = 'If you think you have what it takes to play again, get out there.'
        let win = document.querySelector('.gameEnd')
        win.classList.remove('hide')
        win.style.backgroundColor = '#6fb98f'
        let retryBtn = document.querySelector('.retry')
        retryBtn.addEventListener('click', startOver)
    //lose scenario
    }else if(guesses <= 0){
        setTimeout(function(){
            endMessage.innerText = 'Oh no! It looks like you ran out of guesses.'
            endIntro.innerText = 'That\'s okay though, if you want to play again, you can.'
            let end = document.querySelector('.gameEnd')
            end.classList.remove('hide')
            let retryBtn = document.querySelector('.retry')
            retryBtn.addEventListener('click', startOver)
    }, 500)
    }
}

function startOver (){
    window.location.reload()
}

function isMoney(x){
   return x === '$'
}
