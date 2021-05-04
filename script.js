console.log('this works')

//capture form results

const wordSubmit = document.querySelector('.wordSubmit')
const word = document.querySelector('#charSubmit')


wordSubmit.addEventListener('click', function(event){
    event.preventDefault();
    // submitLogic();
    // grabbing the word entered and putting it into an array
    const charArray = Array.from(word.value)
    console.log(charArray)
    // Use static value to check for certain characters in new array of characters
    // checkLogic(charArray)
    charArray.forEach(char => {
        if(char === 'l'){
            console.log('match')
        }
    })
})

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