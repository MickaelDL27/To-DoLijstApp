document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function getTasksFromStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function saveTasksToStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.querySelector('span').textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createListItem(taskObject) {
        const listItem = document.createElement('li');
        
        if (taskObject.completed) {
            listItem.classList.add('completed');
        }

        listItem.innerHTML = `
            <span>${taskObject.text}</span>
            <button class="delete-btn">X</button>
        `;

        const taskSpan = listItem.querySelector('span');
        taskSpan.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            saveTasksToStorage(); 
        });

        const deleteButton = listItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            saveTasksToStorage();
        });

        return listItem;
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Voer een taak in!');
            return;
        }

        const newTask = { text: taskText, completed: false };
        const listItem = createListItem(newTask);

        taskList.appendChild(listItem);
        taskInput.value = '';

        saveTasksToStorage();
    }

    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => {
            const listItem = createListItem(task);
            taskList.appendChild(listItem);
        });
    }

    loadTasks(); 
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});