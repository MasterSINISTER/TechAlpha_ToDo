document.getElementById("add-task").addEventListener("click", function () {
    var inputVal = document.getElementById("app-form-input").value;
    var showMsg = document.getElementById('msg-display');

    if (inputVal.trim() !== '') {
        var existingData = JSON.parse(localStorage.getItem("Todo")) || [];
        existingData.push(inputVal);
        localStorage.setItem("Todo", JSON.stringify(existingData));
        showMessage("Task Added Succesfully !");
        renderTasks(); // Refresh task list
    } else {
        showMessage("Please enter a task!");
    }
});

function showMessage(message){
    var showMsg = document.getElementById('msg-display');
    showMsg.textContent = message;
    showMsg.style.display = "block";

    // Hide message after 1 second
    setTimeout(function() {
        showMsg.style.display = "none";
    }, 2000);
}

// View Tasks
function renderTasks() {
    var storedTasks = JSON.parse(localStorage.getItem('Todo')) || [];
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ""; // Clear previous tasks

    if (storedTasks.length > 0) {
        storedTasks.forEach(function(task) {
            var li = document.createElement('li');
            li.textContent = task;

            // Create remove button
            var removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'X';
            // var removeButton=document.createElement('i');
            // removeButton.classList.add("fa-solid fa-trash");
            removeButton.addEventListener('click', function() {
                removeTask(task);
            });

            // Append remove button to the list item
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    } else {
        var li = document.createElement('li');
        li.textContent = 'No Tasks Yet !';
        taskList.appendChild(li);
    }
}

// Remove Task
function removeTask(task) {
    var storedTasks = JSON.parse(localStorage.getItem('Todo')) || [];
    var index = storedTasks.indexOf(task);
    if (index !== -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem('Todo', JSON.stringify(storedTasks));
        alert("Task Removed !");
        renderTasks(); // Refresh task list
    }
}

// Initial rendering when the page loads
renderTasks();
