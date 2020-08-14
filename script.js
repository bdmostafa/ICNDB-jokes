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
// const howManyBtn = document.getElementById('howManyBtn');
// const goBtn = document.getElementById('goBtn');
// const addNameBtn = document.getElementById('addNameBtn');
// const specificBtn = document.getElementById('specificBtn');
// const categoriesBtn = document.getElementById('categoriesBtn');


// Event Listeners
listUlElement.addEventListener('click', (e) => {
    const targetEventId = e.target.previousElementSibling.id
    console.log(targetEventId)
    if (targetEventId === 'countBtn') getCountNumber();
    if (targetEventId === 'categoriesBtn') getCategories();
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