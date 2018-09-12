// Importing Quotes from Quotes.js
import quotes from './quotes.js'

document.addEventListener('DOMContentLoaded', function() {

  

  // add task button  
  let addTaskBtn = document.getElementById('add-task');

  // select ul of todo list
  let todoListElement = document.querySelector('.todo-list');

  // Array to store tasks
  let tasks = [];

  // Stores Parsed Array
  let parsedArray = JSON.parse
  (localStorage.getItem('todoTasks'));

  // function for Displaying to do list
  let displayTasks = function(array, elm) {
    // Put content through innerHTML by innerHTML and map the array
    elm.innerHTML = array.map( (item, i) => {
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
  let checkDoneItems = function() {
    //Select all checkboxes
    let checkBoxes = document.querySelectorAll('.done');

    // Check all checkbox if it has true class then confirm done
    checkBoxes.forEach(checkBox => {
      if(checkBox.classList.contains(true)) { // if it has true class
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
  if(parsedArray) {
    tasks = parsedArray;
    displayTasks(tasks, todoListElement); 
  }

  //function to set item to local storage
  let setItemsToLocalStorage = function() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }

  // function for adding task
  let addTask = function() {
    // 1- take task value
    let taskValue = document.getElementById('task-value').value;

    // 2- Make a Empty Object
    let taskItem = {
      task : taskValue,
      done : false
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
  let deleteAndDoneTask = function(e) {
    
    // Get the id of the item
    let id = e.target.parentElement.dataset.id;

    // Check if the class name is not delete then exit the function else delete the item
    if(e.target.className === 'delete') {
      e.preventDefault();
    
      // 2- Delete the item
      tasks.splice(id, 1);

      // 3 - Append the current tasks in the local storage
      setItemsToLocalStorage();

      // Display the list
      displayTasks(tasks, todoListElement);
    } else {
      // Check if checkbox is checked
      if(e.target.checked === true) {
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

  // Function for setDate
  let setTime = function() {
    // store date
    let now = new Date();
    // store hour element
    let hour = document.getElementById('hour');
    // store minute elementy
    let minutes = document.getElementById('minutes');

    // Update innerHTML of hour to current Hours
    hour.innerHTML = now.getHours();
    // Update innerHTML of minutes to current minutes
    minutes.innerHTML = now.getMinutes();

  }

  // First Time Setup
  // store first time block
  let firstTimeBlock = document.querySelector('.first_time_block');

  // store greet user block
  let greet_user_block = document.querySelector('.greet_user_block');

  // Set username value for first time
  let setUserNameValues = function(e) {
    // select userName value
    let userNameValue = document.getElementById('user_name').value;

    // Check wheather the keypress is 'Enter' key for setting userName value
    if(e.keyCode === 13) {
      // if it is then set userName value in localstorage
      JSON.stringify(localStorage.setItem('userName', userNameValue));
      //hide first time block
      firstTimeBlock.style.display = 'none';
      //show greet user block
      greet_user_block.style.display = 'block';
    }
  }

  // Check wheather the userName is stored or not
  let checkUserNameValue = function() {
    // check wheather localStorage has userName or not
    if(localStorage.getItem('userName') === null) {
      //is it is then display first time block
      firstTimeBlock.style.display = 'block';
      // set an event listner for taking userName and set it
      document.body.addEventListener('keypress', setUserNameValues);
    } else { // if it's not then display a greet message
      // display greet user block
      greet_user_block.style.display = 'block';

      // Select Greet user
      let greet_user = document.querySelector('.greet_user');
      // Retrive userName value from local storage and set it to greet user element
      greet_user.innerHTML = localStorage.getItem('userName');;
    }
  }

  

  // set greetmsg function 
  // @params : element(elm)
  let setGreet = function() {
    // Select Greet msg block
    let greetMsg = document.querySelector('.greet_msg');

    let now = new Date();
    // take hours
    let hours = now.getHours();
    //set greet msg according to hours
    if(hours >= 4 && hour <= 12) {
      greetMsg.innerHTML =  'Good Morning';
    } else if(hours >= 13 && hour <= 16) {
      greetMsg.innerHTML = 'Good AfterNoon';
    } else if(hours >= 17 && hour <= 20) {
      greetMsg.innerHTML = 'Good Evening';
    } else if(hours >= 21 && hour <= 23){
      greetMsg.innerHTML = 'Good Night';
    }
  }

  

  //RandomIse Array
  let randomIndex = function(array) {
    return Math.floor(Math.random() * array.length);
  }

  // console.log(randomIndex(quotes));
  console.log(randomIndex(quotes));

  let setQuotes = function(elm1, elm2, array) {
    let randomIndexOfQuote = randomIndex(array);

    elm1.innerHTML = array[randomIndexOfQuote].quote;
    elm2.innerHTML = array[randomIndexOfQuote].author;
  }

  let quote_text = document.querySelector('.quote_text');
  let author_name = document.querySelector('.author_name');

  // Initialized function
  function init() {  
    // Display tasks on page loads
    displayTasks(tasks, todoListElement);

    // add a eventlistener to add task
    addTaskBtn.addEventListener('click',  addTask);

    //Add event listner on ul to deleteBooks and checked for done task
    todoListElement.addEventListener('click', deleteAndDoneTask);

    //recall setDate function after 1s;
    setInterval(setTime, 1000);
    
    // call function for checkUserName available in local Storage or not
    checkUserNameValue();

    // Set Greet According to Hour
    setGreet();
    
    //Set a new quote when ever the page loads
    setQuotes(quote_text, author_name, quotes);    
  }

  init();                         
});