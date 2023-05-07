function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#alias_list');
    target.innerHTML = ' ';
    list.forEach((item) => {
        const str = `<li>${item.aliases}</li>`;
        target.innerHTML += str
    })
}

function filterList(list, query) {
    return list.filter((item) => {
        const lowerCaseName = item.aliases.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery)

    })
}

function cutAliasList(list) {
    console.log('fired cut list');
    const range = [...Array(5).keys()];
    const newArray = range.map((item) => {
        const index = getRandomIntInclusive(0, list.length -1);
        return list[index]
    })
}

async function mainEvent() {
    const mainForm = document.querySelector('.main_form');
    const filterButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.diplay = 'none';
    
    // const textField = document.querySelector('#westerosian')

    let currentList = [];

    loadDataButton.addEventListener('click', async (submitEvent) => {

        submitEvent.preventDefault();

        console.log('form submission');

        const results = await fetch('https://www.anapioficeandfire.com/api/characters');

        currentList = await results.json();
        console.table(currentList);
    })

    filterButton.addEventListener('click', (event) => {
        console.log('clicked FilterButton');

        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);

        console.log(formProps);
        const newList = filterList(currentList, formProps.westerosian);
        injectHTML(currentList);
        console.log(newList);
    })

    generateListButton.addEventListener('click', (event) => {
        console.log('generate new list');
        const aliasList = cutAliasList(currentList);
        console.log(aliasList);
        injectHTML(aliasList);
    })

}

document.addEventListener('DOMContentLoaded', async () => mainEvent());