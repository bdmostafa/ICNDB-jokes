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
const categoriesBtn = document.getElementById('categoriesBtn');
const generateBtn = document.getElementById('generateBtn');
const generateLatestBtn = document.getElementById('generateLatestBtn')
const howManyBtn = document.getElementById('howManyBtn');
const addNameBtn = document.getElementById('addNameBtn');
const specificBtn = document.getElementById('specificBtn');



// Event Listeners
// listUlElement.addEventListener('click', (e) => {
//     const targetEventBtnId = e.target.previousElementSibling.id;
//     // console.log(targetEventBtnId)
//     const targetEventInputId = e.target.previousElementSibling.children[0].id;
//     // console.log(targetEventInputId)
//     if (targetEventBtnId === 'countBtn') getCountNumber();
//     if (targetEventBtnId === 'categoriesBtn') getCategories();
//     if (targetEventBtnId === 'generateBtn') generateRandomJoke();
//     if (targetEventBtnId === 'generateLatestBtn') generateLatestJoke();
//     if (targetEventInputId === 'howManyBtn') getMultipleJokesAsDemand();
//     if (targetEventInputId === 'addNameBtn') addNameInJokes();
//     if (targetEventInputId === 'specificBtn') getSpecificJoke();
// })

countBtn.addEventListener('click', getCountNumber);
categoriesBtn.addEventListener('click', getCategories);
generateBtn.addEventListener('click', generateRandomJoke);
generateLatestBtn.addEventListener('click', generateLatestJoke);
addNameBtn.addEventListener('click', addNameInJokes);
howManyBtn.addEventListener('click', getMultipleJokesAsDemand);
specificBtn.addEventListener('click', getSpecificJoke);




// Functions
// asyncHandler function to avoid repeat 'try/catch'
async function asyncHandler(fn) {
    try {
        await fn()
    } catch (err) {
        display.innerText = `${err.message}. Please input what you need `
    }
}

// Get the total number of jokes
function getCountNumber() {
    return asyncHandler(
        async () => {
            const data = await fetch('http://api.icndb.com/jokes/count');
            const count = await data.json();
            display.innerText = `Well, there are almost ${count.value} Jokes on live. Wow...!`;
        }
    )
}

// function getCountNumber() {
//     return async function asyncHandler() {
//         const data = await fetch('http://api.icndb.com/jokes/count')
//         const count = await data.json();
//         // .then(data => data.json());
//         // console.log(count.value)
//         // console.log(display)
//         display.innerText = `Well, there are almost ${count.value} Jokes on live. Wow...!`;
//     }
// }

// Get the jokes categories
function getCategories() {
    return asyncHandler(
        async () => {
            const data = await fetch('http://api.icndb.com/categories')
            const categories = await data.json();
            // console.log(categories.value.length)
            let categoriesList = [];
            categories.value.forEach(category => {
                categoriesList.push(category)
            })
            display.innerHTML = `Well, the available categories as like below: <strong>${categoriesList.join(', ')}</strong>`;
            // strong tag does not work ====================
        }
    )
}

// Get single random jokes
function generateRandomJoke() {
    return asyncHandler(
        async () => {
            const data = await fetch('https://api.icndb.com/jokes/random')
            const randomJokes = await data.json();
            // console.log(randomJokes)
            display.innerText = randomJokes.value.joke;
        }
    )
}

// Get latest joke
function generateLatestJoke() {
    return asyncHandler(
        async () => {
            const data = await fetch('http://api.icndb.com/jokes/latest')
            const latestJokes = await data.json();
            // console.log(latestJokes.value.length)
            // As there are many value, generate random between value.length
            let randomNum = Math.floor(Math.random() * (latestJokes.value.length - 0 + 1)) + 0;
            // console.log(randomNum)
            display.innerText = latestJokes.value[randomNum].joke;
        }
    )
}

// Get multiple jokes at a time
function getMultipleJokesAsDemand() {
    return asyncHandler(
        async () => {
            // console.log(howManyBtn.value)
            const value = howManyBtn.value;
            const data = await fetch(`https://api.icndb.com/jokes/random/${value}`)
            const jokes = data.json();
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
    )
}

// Get your name in the joke
function addNameInJokes() {
    return asyncHandler(
        async () => {
            const youName = addNameBtn.value;
            const data = await fetch(`http://api.icndb.com/jokes/random?firstName=${youName}`)
            const jokeObj = data.json();
            // console.log(joke.value.joke)
            display.innerText = jokeObj.value.joke;
        }
    )
}

// Get a specific joke with no.
function getSpecificJoke() {
    return asyncHandler(
        async () => {
            const jokeNo = specificBtn.value;
            const data = await fetch(`http://api.icndb.com/jokes/${jokeNo}`)
            const jokeObj = data.json();
            // console.log(joke.value)
            display.innerText = jokeObj.value.joke;
        }
    )
}