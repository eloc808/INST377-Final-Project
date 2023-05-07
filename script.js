function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#character_list');
    target.innerHTML = '';
    list.forEach((item, index) => {
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

async function mainEvent() {
    const mainForm = document.querySelector('.main_form');
    const filterButton = document.querySelector('.filter');
    
    // const textField = document.querySelector('#westerosian')

    let currentList = [];

    mainForm.addEventListener('submit', async (submitEvent) => {

        submitEvent.preventDefault();

        console.log('form submission');

        const results = await fetch('https://www.anapioficeandfire.com/api/characters');

        currentList = await results.json();

        console.table(currentList);
        injectHTML(currentList);
    })

    filterButton.addEventListener('click', (event) => {
        console.log('clicked FilterButton');

        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);

        console.log(formProps);
        const newList = filterList(currentList, formProps.westerosian);

        console.log(newList);
    })

}

document.addEventListener('DOMContentLoaded', async () => mainEvent());