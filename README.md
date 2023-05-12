https://eloc808.github.io/INST377-Final-Project/
# INST377-Final-Project Having Fun With Game of Thrones API
### An interesting way to learn about the characters while watching/reading Game of Thrones
## Description of target browsers: 
Google Chrome version 112.0.5615.138
## Description of project:
API: https://www.anapioficeandfire.com/api/characters
  ### index.html:
  #### Default page of the website
  - Header
  - About/Help button to switch to the second page of the website
  - Load Data button to bring in data from the API
  - Text Input box for users to type in a key-phrase
  - Search for Character button to filter data from APi
  - Show All Characters button to generate list from a key in the API data
  - Generate Pie Chart button linked with Chart.js chart making functionalities

  ### about.html
  #### Second page of the website for instruction on navigating the website
  - Header
  - Home button to return to the default page of the website
  - Text box with images for easy instructions for users

  ### script.js
  #### Connects functionalities of the front-end and makes them work
  - filterList(list, query) filters data received from the API
  - drawGenderPieChart(genderCounts) designs the pie chart and places in data values
  - mainEvent() main function area that calls functions on events like button clicks
  - loadDataButton() function called when Load Data button is clicked
  - filterButton() function called when Search for Character button is clicked
  - generateListButton() function called when Show All Characters button is clicked
  - textField() handles what happens when user types something into text input box
  - generatePieButton() function called to create pie chart when Generate Pie Chart button clicked
  
  ### style.css and aboutstyle.css
  #### Connects with elements on front-end and handles formatting
