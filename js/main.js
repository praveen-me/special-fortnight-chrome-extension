// Importing Quotes from Quotes.js
import quotes from './quotes.js'

import url from './images-url.js';

document.addEventListener('DOMContentLoaded', function () {

  // add task button  
  let addTaskBtn = document.getElementById('add-task');

  // add weather button 
  let cityBtn = document.getElementById("add-city");

  // select ul of todo list
  let todoListElement = document.querySelector('.todo-list');

  // Array to store tasks
  let tasks = [];

  // Stores Parsed Array
  let parsedArray = JSON.parse
    (localStorage.getItem('todoTasks'));

  // function for Displaying to do list
  let displayTasks = function (array, elm) {
    // Put content through innerHTML by innerHTML and map the array
    elm.innerHTML = array.map((item, i) => {
      // Return the Elemnt String
      return (
        `
        <li class="todo_list_item" data-id="${i}">
          <input type="checkbox" class="done ${item.done}">
          <div class="todo_work">${item.task}</div>
          <a href="" class="delete">X</a>
        </li>
        `
      )
    }).join(''); // Join the array and convert it in a string and then addd to the element

    // Call checkDoneItems for checking items are done or not
    checkDoneItems();
  }

  // Check Done Items When Page loads
  let checkDoneItems = function () {
    //Select all checkboxes
    let checkBoxes = document.querySelectorAll('.done');

    // Check all checkbox if it has true class then confirm done
    checkBoxes.forEach(checkBox => {
      if (checkBox.classList.contains(true)) { // if it has true class
        checkBox.setAttribute('checked', ''); // set checked attribute
        checkBox.nextElementSibling.style.cssText =
          "text-decoration : line-through; font-weight : normal"; // set some styles
      } else { // else it has false then set to default
        checkBox.nextElementSibling.style.cssText =
          "text-decoration : none; font-weight : bold";
      }
    });
  }

  // Check if something presents in local Storage
  if (parsedArray) {
    tasks = parsedArray;
    displayTasks(tasks, todoListElement);
  }

  //function to set item to local storage
  let setItemsToLocalStorage = function () {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }

  // function for adding task
  let addTask = function () {
    // 1- take task value
    let taskValue = document.getElementById('task-value').value;

    // 2- Make a Empty Object
    let taskItem = {
      task: taskValue,
      done: false
    };

    // 3- Storing Object on Task Array
    tasks.push(taskItem);

    // 4 - Store the array in the localStorage
    setItemsToLocalStorage();

    // Immediately Display the List
    displayTasks(tasks, todoListElement);

    //reset the value of task-value to empty string
    document.getElementById('task-value').value = '';
  }

  // deleteTask from the toDo List and also add done functionality
  let deleteAndDoneTask = function (e) {

    // Get the id of the item
    let id = e.target.parentElement.dataset.id;

    // Check if the class name is not delete then exit the function else delete the item
    if (e.target.className === 'delete') {
      e.preventDefault();

      // 2- Delete the item
      tasks.splice(id, 1);

      // 3 - Append the current tasks in the local storage
      setItemsToLocalStorage();

      // Display the list
      displayTasks(tasks, todoListElement);
    } else {
      // Check if checkbox is checked
      if (e.target.checked === true) {
        // set done to true
        tasks[id].done = true;

        // Append the current tasks in the local storage
        setItemsToLocalStorage();

        // displayTasksTasks the list
        displayTasks(tasks, todoListElement);
      } else { // else set done to false it it checked again
        tasks[id].done = false;

        // set the all list to local storage
        setItemsToLocalStorage();

        // displayTasksTasks the list
        displayTasks(tasks, todoListElement);
      }
    }
  }

  // store hour element
  let hourElm = document.getElementById('hour');
  // store minute elementy
  let minutesElm = document.getElementById('minutes');

  // Function for setDate
  let setTime = function (hourElm, minuteElm) {
    // store date
    let now = new Date();

    // if minutes and hour are less than 10 add 0 ahead hour and minute
    if (now.getMinutes() < 10) {
      minuteElm.innerHTML = `O${now.getMinutes()}`;
    } else { // if not left as it is
      minuteElm.innerHTML = now.getMinutes();
    }

    if (now.getHours() < 10) {
      hourElm.innerHTML = `O${now.getHours()}`;
    } else {
      hourElm.innerHTML = now.getHours();
    }
  }

  // First Time Setup
  // store first time block
  let firstTimeBlock = document.querySelector('.first_time_block');

  // store greet user block
  let greet_user_block = document.querySelector('.greet_user_block');

  // block element
  let quoteBlock = document.querySelector('.quote_block');

  //User Details Array
  let userDetails = [];

  //Set User Deatils
  let setUserDetails = function () {
    // Parse the userDeatils Array
    let parsedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Select Greet user
    let greetUser = document.querySelector('.greet_user');

    //Github element
    let githubLink = document.getElementById('github_link');
    // twitter elment
    let twitterLink = document.getElementById('twitter_link');
    // medium element
    let mediumLink = document.getElementById('medium_link');
    //linkedin elment
    let linkedinLink = document.getElementById('linkedin_link');
    // setting user name value
    greetUser.innerHTML = parsedUserDetails[0];
    // setting github link
    githubLink.setAttribute('href', `https://github.com/${parsedUserDetails[1]}`);
    // setting twitter link 
    twitterLink.setAttribute('href', `https://twitter.com/${parsedUserDetails[2]}`);
    // setting medium link
    mediumLink.setAttribute('href', `https://medium.com/@${parsedUserDetails[3]}`);
    // setting linkedin link
    linkedinLink.setAttribute('href', `https://linkedin.com/in/${parsedUserDetails[4]}`);
  }

  // Set username value for first time
  let getUserNameValues = function (e) {
    // select userName value
    let userNameValue = document.getElementById('user_name').value;

    let githubValue = document.getElementById('github_value').value;

    let twitter_value = document.getElementById('twitter_value').value;

    let medium_value = document.getElementById('medium_value').value;

    let linkedin_value = document.getElementById('linkedin_value').value;

    // Check wheather the keypress is 'Enter' key for setting userName value
    if (e.keyCode === 13) {

      userDetails.push(userNameValue);
      userDetails.push(githubValue);
      userDetails.push(twitter_value);
      userDetails.push(medium_value);
      userDetails.push(linkedin_value);

      // if it is then set userName value in localstorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      //hide first time block
      firstTimeBlock.style.display = 'none';

      //show greet user block
      greet_user_block.style.display = 'block';
      // setting user deatils
      setUserDetails();

      // Setting quotes to display
      quoteBlock.style.display = 'block';
    }
  }

  // Check wheather the userName is stored or not
  let checkUserNameValue = function () {
    // check wheather localStorage has userName or not
    if (localStorage.getItem('userDetails') === null) {
      //is it is then display first time block
      firstTimeBlock.style.display = 'block';

      greet_user_block.style.display = 'none';
      // set an event listner for taking userName and set it
      document.body.addEventListener('keypress', getUserNameValues);
    } else { // if it's not then display a greet message
      // display greet user block
      greet_user_block.style.display = 'block';

      // display quote block
      quoteBlock.style.display = 'block';

      // setting user details when page loads
      setUserDetails();
    }
  }

  // set greetmsg function 
  // @params : element(elm)
  let setGreet = function (elm) {
    let now = new Date();
    // take hours
    let hours = now.getHours();

    //set greet msg according to hours
    if (hours >= 4 && hours <= 12) {
      elm.innerHTML = 'Good Morning';
    } else if (hours >= 13 && hours <= 16) {
      elm.innerHTML = 'Good AfterNoon';
    } else if (hours >= 17 && hours <= 20) {
      elm.innerHTML = 'Good Evening';
    } else if (hours >= 21 && hours <= 23) {
      elm.innerHTML = 'Good Night';
    } else if (hours >= 0 && hours <= 3) {
      elm.innerHTML = 'Good Night';
    }
  }

  // Select Greet msg block
  let greetMsg = document.querySelector('.greet_msg');

  //RandomIse Array
  let randomIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  }

  // Functions for set random quotes
  let setQuotes = function (elm1, elm2, array) {
    // Take a random index by passing array
    let randomIndexOfQuote = randomIndex(array);
    // Add Quotes
    elm1.innerHTML = array[randomIndexOfQuote].quote;
    // Add Quote author
    elm2.innerHTML = array[randomIndexOfQuote].author;
  }

  //Select Quote text Alement
  let quoteText = document.querySelector('.quote_text');
  // Seleect Quote Author element
  let authorName = document.querySelector('.author_name');


  //Set random background 
  let setRandomBackground = function () {
    let link = 'https://api.unsplash.com/collections/311028/photos/';
    let accessToken = '?per_page=30&client_id=7200cb58d12b5b5169a2904f02f480b1d9381716781e631cba49cfc2ed9e8cd7'
    let url = link + accessToken;

    fetch(url).then(response => {
      return response.json().then(images => {
        let i = randomIndex(images);
        console.log(i)
        document.body.setAttribute('style', `background : linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('${images[i].urls.regular}');
         background-position: center;
         background-size: cover;
         background-repeat: no-repeat;
         `);
        console.log(images[i]);
      })
    })

  }

  //reset all data if reset all data button clicked
  let resetData = function () {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('todoTasks');
    alert('All Data Cleared');
  }

  //reset button
  let resetIt = document.getElementById('reset-data');

  function setCity(city) {
    // form field for city
    var city_field = document.getElementById("city_value")

    let city_val = city_field.value;

    localStorage.setItem('city', city_val);
    getWeatherDetails();
  }

  function getWeatherDetails() {
    // Set to local storage
    let city = String(localStorage.getItem("city"));
    console.log(city);
    if (city == null) {
      console.log("Error: No city set")
    }
    else {

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&APPID=5437540a4b1f9a06516d43ed1ef3d5ee`)
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Sorry, there was a problem fetching the weather data. Status Code:' +
                response.status);
              return;
            }

            response.json().then(function (data) {
              // Update city title element
              let city_title_elem = document.getElementById("city_title");
              city_title_elem.innerHTML = data.name;

              // Assign weather descriptions to variables for clarity
              let description = data.weather[0].description
              let main_weather_description = data.weather[0].main

              // Update weather description elements
              let main_description_elem = document.getElementById("main_description")
              main_description_elem.innerHTML = main_weather_description;

              let description_elem = document.getElementById("detailed_description")
              description_elem.innerHTML = description;

              let temperature_elem = document.getElementById("temp");
              temperature_elem.innerHTML = `${data.main.temp} °C`;

              // Optional: can include icon image also, but not implemented currently.
              let icon_code = data.weather[0].icon;

              let icon_img = document.getElementById("weather_icon");
            });
          }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });

    }


  }

  function procImage(icon) {
    icon.height = 12;
    icon.width = 12;
  }

  // Initialized function
  function init() {

    // Display tasks on page loads
    displayTasks(tasks, todoListElement);

    // add a eventlistener to add task
    addTaskBtn.addEventListener('click', addTask);

    //Add event listner on ul to deleteBooks and checked for done task
    todoListElement.addEventListener('click', deleteAndDoneTask);

    // Add event listener to check if the city has been entered by the user
    cityBtn.addEventListener("click", setCity)

    //recall setDate function after 1s;
    setInterval(function () {
      setTime(hourElm, minutesElm);
    }, 1000);

    // call function for checkUserName available in local Storage or not
    checkUserNameValue();

    // Set Greet According to Hour
    setGreet(greetMsg);

    //Set a new quote when ever the page loads
    setQuotes(quoteText, authorName, quotes);

    //set random background 
    setRandomBackground();

    resetIt.addEventListener('click', resetData);

    getWeatherDetails();
  }

  init();
});