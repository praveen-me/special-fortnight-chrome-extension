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
  let display = function(array, elm) {
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
      if(checkBox.classList.contains(true)) {
        checkBox.setAttribute('checked', '');
        // checkBox.nextElementSibling.style.textDecoration = 'line-through';
        checkBox.nextElementSibling.style.cssText = 
        "text-decoration : line-through; font-weight : normal";
      } else { // else it has false then set to default
        // checkBox.nextElementSibling.style.textDecoration = 'none';
        checkBox.nextElementSibling.style.cssText = 
        "text-decoration : none; font-weight : bold";
      }
    });
  }
  
  // Check if something presents in local Storage
  if(parsedArray) {
    tasks = parsedArray;
    display(tasks, todoListElement); 
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
      display(tasks, todoListElement);

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
      display(tasks, todoListElement);
    } else {
      // Check if checkbox is checked
      if(e.target.checked === true) {
        // set done to true
        tasks[id].done = true;
  
        // 3 - Append the current tasks in the local storage
        setItemsToLocalStorage();
  
        // display the list
        display(tasks, todoListElement);      
      } else { // else set done to false it it checked again
        tasks[id].done = false;

        // set the all list to local storage
        setItemsToLocalStorage();

        // display the list
        display(tasks, todoListElement);
      }
    }
  }

  // Initialized function
  function init() {  
    // Display tasks on page loads
    display(tasks, todoListElement);

    // add a eventlistener to add task
    addTaskBtn.addEventListener('click',  addTask);

    //Add event listner on ul to deleteBooks and checked for done task
    todoListElement.addEventListener('click', deleteAndDoneTask);
  }

  init();                         
});