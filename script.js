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
        const aliases = Array.isArray(item.aliases) ? item.aliases.join(', ') : item.aliases;
        const lowerCaseName = (aliases || "").toLowerCase();
        const lowerCaseQuery = (query ||  "").toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery);
    });
}

function cutAliasList(list) {
    console.log('fired cut list');
    let cloneList = [...list]; // Clone list to avoid mutation
    const newArray = [];

    for (let i = 0; i < 15; i++) { // We want 15 unique items
        if (cloneList.length === 0) {
            break; // Break if there are not enough items
        }
        const index = getRandomIntInclusive(0, cloneList.length -1);
        newArray.push(cloneList[index]); // Add the selected item to newArray
        cloneList.splice(index, 1); // Remove selected item from cloneList
    }

    return newArray;
}

function countGenders(list) {
    const genderCounts = { 'Male': 0, 'Female': 0, 'Unknown': 0 };
    list.forEach(item => {
        if (item.gender === 'Male') {
            genderCounts.Male++;
        } else if (item.gender === 'Female') {
            genderCounts.Female++;
        } else {
            genderCounts.Unknown++;
        }
    });
    return genderCounts;
}

function drawGenderPieChart(genderCounts) {
    const ctx = document.getElementById('genderPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Male', 'Female', 'Unknown'],
            datasets: [{
                data: [genderCounts.Male, genderCounts.Female, genderCounts.Unknown],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
    });
}



async function mainEvent() {
    const mainForm = document.querySelector('.main_form');
    const filterButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#westerosian');
    const generatePieButton = document.querySelector('#genPie');

    const loadAnimation = document.querySelector('#data_load_animation');
    // loadAnimation.style.diplay = 'none';
    
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

    textField.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newList = filterList(currentList, event.target.value);
        console.log(newList);
        injectHTML(newList);
    })

    generatePieButton.addEventListener('click', (event) => {
        console.log('generate new pie');
        const genderCounts = countGenders(currentList);
        drawGenderPieChart(genderCounts);
    })
}



document.addEventListener('DOMContentLoaded', async () => mainEvent());
// olo