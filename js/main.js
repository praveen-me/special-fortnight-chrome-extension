// document.addEventListener('DOMContentLoaded', function() {

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
  let display = function(array, elm) {
    // Put content through innerHTML by innerHTML and map the array
    elm.innerHTML = array.map( (item) => {
      // Return the Elemnt String
      return (
        `
        <li class="todo_list_item">
          <input type="checkbox" class="done ${item.done}">
          <div class="todo_work">${item.task}</div>
        </li>
        `
      )
    }).join(''); // Join the array and convert it in a string and then addd to the element
  }


  // Check if something presents in local Storage
  if(parsedArray) {
    tasks = parsedArray;
    display(tasks, todoListElement); 
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
    localStorage.setItem('todoTasks', JSON.stringify(tasks));

    // Immediately Display the List
      display(tasks, todoListElement);

  }

  


  // Initialized function
  function init() {  
    // Display tasks on page loads
    display(tasks, todoListElement);

    // add a eventlistener to add task
    addTaskBtn.addEventListener('click',  addTask);
  }

  init();

// });