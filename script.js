
//capture form results

const submitBttn = document.querySelector('.wordSubmit')
const word = document.querySelector('#wordField')
const startGame = document.querySelector('.gameStart')

let checkArray = []

submitBttn.addEventListener('click', function(event){
    event.preventDefault();
    // submitLogic();
    // grabbing the word entered and putting it into an array
    var charArray = Array.from(word.value)
    console.log(charArray)
    const specialArray = ['!','?','@','#', '%', '^','&','(',')','-', '_', '=','+','[',']','{','}','|',';',':','\'','\"',',','.','<','>','/','`','~']
    let spaceDetector = (charArray.includes(' '))
    let specialChar = specialArray.some(special => charArray.includes(special))
    if(spaceDetector === true){
        let errorMessage = document.querySelector('#error')
        errorMessage.innerText = `Woah there, you cannot use a space! Try again with out the space.`
        errorMessage.classList.remove('hide')
        word.value = ''
        console.log('space detected')
        return
    }
    if (specialChar === true){
        let errorMessage = document.querySelector('#error')
        errorMessage.innerText = `Woah there, you cannot use a special character! Try again without the special character.`
        errorMessage.classList.remove('hide')
        word.value = ''
        console.log('special char')
        return
    }
    // Use static value to check for certain characters in new array of characters
    //Push charArray into html so it can be accessed by the user guesses
    console.log(charArray)
    for (let i = 0; i < charArray.length; i++) {
        let li = document.createElement('li')
        li.innerText = charArray[i]
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
    }, 1000)
    checkNode = document.querySelectorAll('.guessChars');
    checkArray = [].slice.call(checkNode);
})



//User submission for letter guessed

//Need to capture the user submisson for a guess letter
const charGuess = document.querySelector('#charField')
const charSubmit = document.querySelector('.charSubmit')
//Need to grab the submitted letter after user submits
let guessArray;
let correctGuess = 0

charSubmit.addEventListener('click', function(event){
    event.preventDefault();
    const char = charGuess.value
    //Need to access HTML li elements created with initial user submission lines 18 - 23
    //Need to use the submitted letter to compare it against the array of characters for the word submitted
    charGuess.value = ''
    var correct = false
    
    guessArray = document.querySelectorAll('.guessChars');

    guessArray.forEach(guess => {
        if (guess.innerText == char){
            console.log('match')
            correct = true
            //Need to access available letters style on match
            guess.style.opacity = 1
            // if(checkArray.includes(char) && checkObj[char] === 0){
            //     return
            // }else{
            //     checkArray.push(char)
            //     console.log(`this is it before: ${checkObj[char]}`)
            //     checkObj[char] -=1
            //     console.log(`this is it after: ${checkObj[char]}`)
            // }
            checkArray.splice(guess.dataset.position, 1, '$')
        }
    })
    console.log(`Correct gusses are: ${correctGuess}`)
    if (correct === false){
        updateGuesses()
        loseGame()
    }
    if (correct === true){
        winGame()
    }
})

let guesses = 5
let guessesDisplay = document.querySelector('.guessesLeft')

function updateGuesses() {
    guesses -= 1
    guessTracking = guessesDisplay.textContent = guesses
}

function loseGame() {
    if (guesses <= 0){
        console.log('Its over man')
        let end = document.querySelector('.gameOver')
        end.classList.remove('hide')
        let retryBtn = document.querySelector('.retry')
        retryBtn.addEventListener('click', startOver)
    }
}

function winGame(){
   if(checkArray.every(isMoney) === true){
       console.log('you win')
   }
}

function startOver (){
    window.location.reload()
}

var tempArray = []

function checkCharSum(arr){
    for (let i = 0; i < arr.length; i++){
        tempArray.push(arr[i].innerText)
    }
    return tempArray.reduce(function(a, b){
        a[b] = a[b] +1||1
        return a;
    }, {});
}

function isMoney(x){
   return x === '$'
}