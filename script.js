
//capture form results

//Variables & Query Selectors

const submitBttn = document.querySelector('.wordSubmit')
const word = document.querySelector('#wordField')
const startGame = document.querySelector('.gameStart')

//Setting variable with global scope so it can be carried through functions. 
let checkArray = []

const nextInstruction = document.querySelector('.instructionsBtn')
const instructionsColumn1 = document.querySelector('#instructionsContentCol1')
const instructionsColumn2 = document.querySelector('#instructionsContentCol2')
const instructionText = document.querySelector('.instructionText')
const instructionsContent = document.querySelector('.instructionsContent')

//Event listener to move through beginning instructions.
nextInstruction.addEventListener('click', function(event){
    event.preventDefault();
    instructionsColumn1.innerText = 'Think of your word and once you\'re ready, hit start game.'
    instructionsColumn2.innerText = 'While Player 1 is thinking of their word, just hang tight. You cannot look at the screen while they\'re entering the word. This is a test of honor.'
    instructionText.innerText = 'Get ready, follow the below instructions and hit Start Game'
    nextInstruction.innerText = 'Start Game'
    //Declaring new event listener to keep the same button but have it remove the instruction modal.
    nextInstruction.addEventListener('click', function(event){
        event.preventDefault();
        instructionsContent.classList.add('hide')

    })
})

//Event listener set-up to accept word to be guessed submission
submitBttn.addEventListener('click', function(event){
    event.preventDefault();
    // grabbing the word entered and putting it into an array
    var charArray = Array.from(word.value)
    //Creating an array of special character to be used for validation
    const specialArray = ['!','?','@','#', '%', '^','&','(',')','-', '_', '=','+','[',']','{','}','|',';',':','\'','\"',',','.','<','>','/','`','~']
    //Vairable capturing boolean for spaces in submission. Used for validation.
    let spaceDetector = (charArray.includes(' '))
    //Vairable capturing boolean for special characters (array from line 40) in submission. Used for validation.
    let specialChar = specialArray.some(special => charArray.includes(special))
    //Conditionals using above variables to preform submission validation on form.
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
    //Push charArray into html so it can be accessed by the user guesses
    for (let i = 0; i < charArray.length; i++) {
        let li = document.createElement('li')
        li.innerText = charArray[i].toLowerCase()
        //Adding class so it can access later in guess character submission (lines 41 - 44)
        li.classList = 'guessChars'
        //adding dataSet of position in array to access on line 130
        li.setAttribute('data-position', i)
        li.style.opacity = 0
        let ul = document.querySelector('.guessWord')
        ul.appendChild(li)
    }
    //Adding timing to beginning of game for UX
    setTimeout(function(){
        startGame.style.opacity = 0
        startGame.style.pointerEvents = 'none'
    }, 500)
    //Grabbing NodeList from DOM elements created on lines 71 - 79
    checkNode = document.querySelectorAll('.guessChars');
    //Converting NodeList to an array to be used in checking guesses line 130
    checkArray = Array.from(checkNode);
    //Grabbing guess word length to display to user
    let wordLength = document.querySelector('.wordLength')
    wordLength.innerText = charArray.length
})



//User submission for letter guessed

//Capture the user submisson for a guess letter
const charGuess = document.querySelector('#charField')
const charSubmit = document.querySelector('.charSubmit')
//Grab the submitted letter after user submits
//Setting global variables for easier access outside of functions
let guessArray;
let correctGuess = 0;
let availLetters;

//Event listener for user guess submission
charSubmit.addEventListener('click', function(event){
    event.preventDefault();
    //Variable containing user guess
    const char = charGuess.value.toLowerCase()

    //Need to use the submitted letter to compare it against the array of characters for the word submitted
    charGuess.value = ''
    //Variable used to check for correct answers in forEach statement
    var correct = false
    //Access DOM elements created with initial user submission lines 71 - 79
    guessArray = document.querySelectorAll('.guessChars');

    //Checking each letter of word for a match with guessed letter
    guessArray.forEach(guess => {
        if (guess.innerText == char){
            //line 118
            correct = true
            //Need to access available letters style on match
            guess.style.opacity = 1
            //Replacing checkArray with $ to signify a correct guess. Reference lines 88-90 & 77
            checkArray.splice(guess.dataset.position, 1, '$')
        }
    })
    //Using variable declared on line 118 to update guesses & check for loss
    if (correct === false){
        updateGuesses()
        endGame()
    }
    //Using variable declared on line 118 to update guesses & check for win
    if (correct === true){
        endGame()
    }
    //Updating DOM to hide guessed letters
    availLetters = document.getElementById(`${char}`)
    availLetters.classList.add('hide')
})

//Setting variables to track guesses and update DOM
let guesses = 4
let rowPosition = 1

//Setting DOM guess display
let guessesDisplay = document.querySelector('.guessesLeft')

//Function update guesses and DOM
function updateGuesses() {
    //Line 148
    guesses -= 1
    //Line 149
    rowPosition += 1
    //Updating DOM guess display
    guessTracking = guessesDisplay.textContent = guesses
    //Grabbing parachute image
    let paraImg = document.querySelector('.paraImg')
    //Adding new slide animation each time function is called
    paraImg.classList.add(`slide${rowPosition}`)
    //Updating guesses position and color
    guessesDisplay.style.gridRow = rowPosition
    if(guesses === 3){
        guessesDisplay.style.backgroundColor = 'rgba(255, 255, 80, 0.5)'
    }else if(guesses === 2){
        guessesDisplay.style.backgroundColor = 'rgba(255, 166, 0, 0.5)'
    }else if(guesses === 1){
        guessesDisplay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
    }
}

//Grabbing end game text fields
const endMessage = document.querySelector('.endMessage')
const endIntro = document.querySelector('.endIntro')

function endGame(){
    //win scenario
    if(checkArray.every(isMoney) === true){
        //Updating end game text fields and visuals on DOM
        endMessage.innerText = 'Oh yea! It looks like you were able to guess the word!'
        endIntro.innerText = 'If you think you have what it takes to play again, get out there.'
        let win = document.querySelector('.gameEnd')
        win.classList.remove('hide')
        win.style.backgroundColor = '#6fb98f'
        let retryBtn = document.querySelector('.retry')
        retryBtn.addEventListener('click', startOver)
    //lose scenario
    }else if(guesses <= 0){
        //Updating end game text fields and visuals on DOM
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

//Function to restart game
function startOver (){
    window.location.reload()
}

//Function used in win condition line 183
function isMoney(x){
   return x === '$'
}
