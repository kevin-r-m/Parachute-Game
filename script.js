
//capture form results

const submitBttn = document.querySelector('.wordSubmit')
const word = document.querySelector('#wordField')
const startGame = document.querySelector('.gameStart')


submitBttn.addEventListener('click', function(event){
    event.preventDefault();
    // submitLogic();
    // grabbing the word entered and putting it into an array
    var charArray = Array.from(word.value)
    console.log(charArray)
    let spaceDetector = (charArray.includes(' '))
    if(spaceDetector === true){
        console.log('space detected')
        return
    }
    
    // Use static value to check for certain characters in new array of characters
    // checkLogic(charArray)
    //Push charArray into html so it can be accessed by the user guesses
    charArray.forEach(char => {
        let li = document.createElement('li')
        li.innerText = char
        //Adding class so it can access later in guess character submission (lines 41 - 44)
        li.classList = 'guessChars'
        li.style.opacity = 0
        let ul = document.querySelector('.guessWord')
        ul.appendChild(li)
    })
    setTimeout(function(){
        startGame.style.opacity = 0
        startGame.style.pointerEvents = 'none'
    }, 1000)
})



//User submission for letter guessed

//Need to capture the user submisson for a guess letter
const charGuess = document.querySelector('#charField')
const charSubmit = document.querySelector('.charSubmit')
//Need to grab the submitted letter after user submits
charSubmit.addEventListener('click', function(event){
    event.preventDefault();
    const char = charGuess.value
    //Need to access HTML li elements created with initial user submission lines 18 - 23
    let guessArray = document.querySelectorAll('.guessChars')
    //Need to use the submitted letter to compare it against the array of characters for the word submitted
    charGuess.value = ''
    var correct = false
    guessArray.forEach(guess => {
        if (guess.innerText == char){
            console.log('match')
            correct = true
            //Need to access available letters style on match
            guess.style.opacity = 1
        } 

    })
    if (correct === false){
        updateGuesses()
        endGame()
    }
})

let guesses = 5
let guessesDisplay = document.querySelector('.guessesLeft')

function updateGuesses() {
    guesses -= 1
    guessTracking = guessesDisplay.textContent = guesses
}

function endGame() {
    if (guesses <= 0){
        console.log('Its over man')
    }
}

function winGame (){
    console.log(guessArray)
}

//Function for submission logic
    // function submitLogic(){
    //     const charArray = Array.from(word.value)
    //     console.log(charArray)
    // }

//Function for character matching logic
    // function checkLogic(array){
    //     array.forEach(char => {
    //         if(char === 's'){
    //             console.log('match')
    //         }
    //     })
    // }