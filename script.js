console.log('this works')

//capture form results

const submitBttn = document.querySelector('.wordSubmit')
const word = document.querySelector('#wordField')


submitBttn.addEventListener('click', function(event){
    event.preventDefault();
    // submitLogic();
    // grabbing the word entered and putting it into an array
    var charArray = Array.from(word.value)
    console.log(charArray)
    // Use static value to check for certain characters in new array of characters
    // checkLogic(charArray)
    //Push charArray into html so it can be accessed by the user guesses
    charArray.forEach(char => {
        let li = document.createElement('li')
        li.innerText = char
        //Adding class so it can access later in guess character submission (lines 41 - 44)
        li.classList = 'guessChars'
        li.setAttribute('data-figure', char)
        let ul = document.querySelector('.guessWord')
        ul.appendChild(li)
    })
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
    guessArray.forEach(guess => {
        if (guess.innerText === char){
            console.log('match')

        }

    })
    console.log(char)
})
//Need to use the submitted letter to compare it against the array of characters for the word



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