
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
    if (correct === false){
        updateGuesses()
        endGame()
    }
    if (correct === true){
        endGame()
    }
})

let guesses = 5
let imgRowPosition = 1

let guessesDisplay = document.querySelector('.guessesLeft')

function updateGuesses() {
    guesses -= 1
    imgRowPosition += 1
    guessTracking = guessesDisplay.textContent = guesses
    let paraImg = document.querySelector('.paraImg')
    paraImg.style.gridRow = imgRowPosition
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
        let retryBtn = document.querySelector('.retry')
        retryBtn.addEventListener('click', startOver)
    //lose scenario
    }else if(guesses <= 0){
        endMessage.innerText = 'Oh no! It looks like you ran out of guesses.'
        endIntro.innerText = 'That\'s okay though, if you want to play again, you can.'
        let end = document.querySelector('.gameEnd')
        end.classList.remove('hide')
        let retryBtn = document.querySelector('.retry')
        retryBtn.addEventListener('click', startOver)
    }
}

function startOver (){
    window.location.reload()
}

// var tempArray = []

// function checkCharSum(arr){
//     for (let i = 0; i < arr.length; i++){
//         tempArray.push(arr[i].innerText)
//     }
//     return tempArray.reduce(function(a, b){
//         a[b] = a[b] +1||1
//         return a;
//     }, {});
// }

function isMoney(x){
   return x === '$'
}
