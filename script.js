// https://api.icndb.com/jokes/random
// https://api.icndb.com/jokes/random/5 - numbers of jokes at a time
// http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
// http://api.icndb.com/jokes/ 
// http://api.icndb.com/jokes/15 - specific joke
// http://api.icndb.com/jokes/count - count jokes in number
// http://api.icndb.com/categories

// http://api.icndb.com/jokes/random?limitTo=[nerdy]
// http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]

// http://api.icndb.com/jokes/random?exclude=[nerdy]
// http: //api.icndb.com/jokes/random?exclude=[nerdy,explicit]

// Selectors
const display = document.getElementById('display');
const listUlElement = document.querySelector('.action-list');
// const generateBtn = document.getElementById('generateBtn');
// const howManyBtn = document.getElementById('howManyBtn');
// const goBtn = document.getElementById('goBtn');
// const addNameBtn = document.getElementById('addNameBtn');
// const specificBtn = document.getElementById('specificBtn');
// const categoriesBtn = document.getElementById('categoriesBtn');
// const countBtn = document.getElementById('countBtn');

// Event Listeners
generateBtn.addEventListener('click', getRandomJokes);
// goBtn.addEventListener('click', getJokesAsNumber);




// Functions
async function getRandomJokes() {
    const joke = await fetch('https://api.icndb.com/jokes/random')
        .then(data => data.json())
    // console.log(joke.value.joke)
    display.innerText = joke.value.joke
}
console.log(howManyBtn.value)

async function getJokesAsNumber(howManyBtn) {

    const joke = await fetch(`https://api.icndb.com/jokes/random/${howManyBtn}`)
        .then(data => data.json())

}