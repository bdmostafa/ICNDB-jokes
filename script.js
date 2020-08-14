// https://api.icndb.com/jokes/random
// https://api.icndb.com/jokes/random/5 - numbers of jokes at a time
// http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
// http://api.icndb.com/jokes/ 
// http://api.icndb.com/jokes/15 - specific joke
// http://api.icndb.com/jokes/count - count jokes in number
// http://api.icndb.com/categories

// http://api.icndb.com/jokes/latest

// http://api.icndb.com/jokes/random?limitTo=[nerdy]
// http://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]

// http://api.icndb.com/jokes/random?exclude=[nerdy]
// http: //api.icndb.com/jokes/random?exclude=[nerdy,explicit]

// Selectors
const display = document.getElementById('display');
const listUlElement = document.querySelector('.action-list');
const countBtn = document.getElementById('countBtn');
// const generateBtn = document.getElementById('generateBtn');
const howManyBtn = document.getElementById('howManyBtn');
// const goBtn = document.getElementById('goBtn');
const addNameBtn = document.getElementById('addNameBtn');
// const specificBtn = document.getElementById('specificBtn');
// const categoriesBtn = document.getElementById('categoriesBtn');


// Event Listeners
listUlElement.addEventListener('click', (e) => {
    const targetEventBtnId = e.target.previousElementSibling.id;
    const targetEventInputId = e.target.previousElementSibling.children[0].id;
    console.log(targetEventInputId)
    if (targetEventBtnId === 'countBtn') getCountNumber();
    if (targetEventBtnId === 'categoriesBtn') getCategories();
    if (targetEventBtnId === 'generateBtn') generateRandomJoke();
    if (targetEventBtnId === 'generateLatestBtn') generateLatestJoke();
    if (targetEventInputId === 'howManyBtn') getJokesAsDemand();
    if (targetEventInputId === 'addNameBtn') addNameInJokes();
})




// Functions
async function getCountNumber() {
    const count = await fetch('http://api.icndb.com/jokes/count')
        .then(data => data.json());
    // console.log(count.value)
    // console.log(display)
    display.innerText = `Well, there are almost ${count.value} Jokes on live. Wow...!`;
}

async function getCategories() {
    const categories = await fetch('http://api.icndb.com/categories')
        .then(data => data.json());
    // console.log(categories.value.length)
    let categoriesList = [];
    categories.value.forEach(category => {
        categoriesList.push(category)
    })
    display.innerHTML = `Well, the available categories as like below: <strong>${categoriesList.join(', ')}</strong>`;
    // strong tag does not work ====================

}

async function generateRandomJoke() {
    const randomJokes = await fetch('https://api.icndb.com/jokes/random')
        .then(data => data.json());
    // console.log(randomJokes)
    display.innerText = randomJokes.value.joke;
}

async function generateLatestJoke() {
    const latestJokes = await fetch('http://api.icndb.com/jokes/latest')
        .then(data => data.json());
    // console.log(latestJokes.value.length)
    // As there are many value, generate random between value.length
    let randomNum = Math.floor(Math.random() * (latestJokes.value.length - 0 + 1)) + 0;
    // console.log(randomNum)
    display.innerText = latestJokes.value[randomNum].joke;
}

async function getJokesAsDemand() {
    // console.log(howManyBtn.value)
    const value = howManyBtn.value;
    const jokes = await fetch(`https://api.icndb.com/jokes/random/${value}`)
        .then(data => data.json());
    // console.log(jokes.value[0].joke);
    let displayJokes = [];
    // Display all the jokes with serial index no
    jokes.value.forEach((joke, index) => {
        displayJokes.push(`
        Joke: ${index + 1}
        <br>
        ${joke.joke}
        <hr>
        `);
    })
    display.innerHTML = displayJokes.join(' ');
}

async function addNameInJokes() {
    const name = addNameBtn.value;
    const joke = await fetch(`http://api.icndb.com/jokes/random?firstName=${name}`)
        .then(data => data.json());
    // console.log(joke.value.joke)
    display.innerText = joke.value.joke;
}