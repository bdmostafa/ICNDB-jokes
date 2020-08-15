// These APIs are used here =============================================
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
// http://api.icndb.com/jokes/random?exclude=[nerdy,explicit]



// Selectors ==============================================================
const display = document.getElementById('display');
const listUlElement = document.querySelector('.action-list');

// const countBtn = document.getElementById('countBtn');
// const categoriesBtn = document.getElementById('categoriesBtn');
// const generateBtn = document.getElementById('generateBtn');
// const generateLatestBtn = document.getElementById('generateLatestBtn')
// const howManyBtn = document.getElementById('howManyBtn');
// const addNameBtn = document.getElementById('addNameBtn');
// const specificBtn = document.getElementById('specificBtn');



// Event Listeners ======================================================

// countBtn.addEventListener('click', getCountNumber);
// categoriesBtn.addEventListener('click', getCategories);
// generateBtn.addEventListener('click', generateRandomJoke);
// generateLatestBtn.addEventListener('click', generateLatestJoke);
// addNameBtn.addEventListener('click', addNameInJokes);
// howManyBtn.addEventListener('click', getMultipleJokesAsDemand);
// specificBtn.addEventListener('click', getSpecificJoke);

// Another way to event listeners to avoid multiple addEventListener and selectors
listUlElement.addEventListener('click', (e) => {
    const targetedId = e.target.id;
    // console.log(targetedId)
    if (targetedId === 'countBtn') getCountNumber();
    if (targetedId === 'categoriesBtn') getCategories();
    if (targetedId === 'generateBtn') generateRandomJoke();
    if (targetedId === 'generateLatestBtn') generateLatestJoke();
    if (targetedId === 'howManyBtn') getMultipleJokesAsDemand();
    if (targetedId === 'addNameBtn') addNameInJokes();
    if (targetedId === 'specificBtn') getSpecificJoke();
})


// Functions =============================================================

// asyncHandler function to avoid repeat 'try/catch'
async function asyncHandler(fn) {
    try {
        await fn()
    } catch {
        display.innerText = `Oops! Please input in a right way.`
    }
}

// Get the total number of jokes
function getCountNumber() {
    return asyncHandler(
        async () => {
            const data = await fetch('http://api.icndb.com/jokes/count');
            const count = await data.json();
            display.innerHTML = `Well, there are almost <span> ${count.value} </span>Jokes on live right now. Wow...!`;
        }
    )
}

// Avoid this below type function using asyncHandler()
// async function getCountNumber() {
//     try {
//         const data = await fetch('http://api.icndb.com/jokes/count')
//         const count = await data.json();
//         // .then(data => data.json());
//         // console.log(count.value)
//         // console.log(display)
//         display.innerText = `Well, there are almost ${count.value} Jokes on live. Wow...!`;
//     } catch (err) {
//         console.log(err.message)
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
            display.innerHTML = `Well, the available categories as like below: <span>${categoriesList.join(', ')}</span>`;
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
            const value = Number(prompt('Please input only a number how many jokes at a time you want to see', 5))
            const data = await fetch(`https://api.icndb.com/jokes/random/${value}`)
            const jokes = await data.json();
            // console.log(jokes.value[0].joke);
            let displayJokes = [];
            // Display all the jokes with serial index no
            jokes.value.forEach((joke, index) => {
                displayJokes.push(`
                    <span>Joke: ${index + 1}</span>
                    <br>
                    ${joke.joke}
                    <hr>
                `);
            })
            display.innerHTML = displayJokes.join(' '); // join(' ') is used to avoid comma (,)
        }
    )
}

// Get your name in the joke
function addNameInJokes() {
    return asyncHandler(
        async () => {
            const yourName = prompt('Please input your name to see it in the jokes as a main character', 'Mostafa');
            const data = await fetch(`http://api.icndb.com/jokes/random?firstName=${yourName}`)
            const jokeObj = await data.json();
            // console.log(joke.value.joke)
            display.innerText = jokeObj.value.joke;
        }
    )
}

// Get a specific joke with no.
function getSpecificJoke() {
    return asyncHandler(
        async () => {
            const jokeNo = Number(prompt('Please input only a number to see a specific joke related to this number', 27));
            const data = await fetch(`http://api.icndb.com/jokes/${jokeNo}`)
            const jokeObj = await data.json();
            // console.log(joke.value)
            display.innerText = jokeObj.value.joke;
        }
    )
}