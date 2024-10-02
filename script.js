$(document).ready(function() {
    loadTasks();
    updateTaskCounter();  // Update task counter
    updateCompletedCounter();
    $('#add-task').click(function() {
        var task = $('#new-task').val();
        var taskExists = false;

        $('#task-list li .taskitem').each(function(){
            if ($(this).text() === task) {
                taskExists = true;
                return false; // Exit the loop
            }
        });
        if(task ==='')
        {
            alert("You must Write Something");
        }
        else if(taskExists) {
            alert("Task is already present");
            $('#new-task').val('');
        }
        else{
            var task = $('#new-task').val();
            if(task){
                var taskItem = `<li><span class="taskitem">${task}</span><button class="btn deleteBtn float-end"><span class="material-symbols-outlined">delete</span></button><button class="btn completeBtn float-end"><span class="material-symbols-outlined">check</span></button></li>`;
                $('#task-list').append(taskItem);
                saveTasks();
                updateTaskCounter(); 
                $('#new-task').val('');
            }
        }
    });
    $(document).on('click', '.completeBtn', function() {
        let taskItem = $(this).parent();
        taskItem.find('.completeBtn').remove();
        taskItem.appendTo('#completed-list').addClass('completed');
        updateTaskCounter(); 
        updateCompletedCounter();
        saveTasks();

    });
    $(document).on('click', '.deleteBtn', function() {
        // $(this).parent().remove();
        // saveTasks();
        let taskItem = $(this).parent();
        if (taskItem.parent().attr('id') === 'task-list') {
            taskItem.remove();  
            updateTaskCounter();  
        } else if (taskItem.parent().attr('id') === 'completed-list') {
            taskItem.remove();
            updateCompletedCounter(); 
        }        
        saveTasks()
    });

    function saveTasks() {
        let todoTasks = [];
        $('#task-list li').each(function() {
            const task = $(this).find('span.taskitem').text();  // Get task text
            todoTasks.push({ task: task, completed: false });  // Save as not completed
        });
    
        let completedTasks = [];
        $('#completed-list li').each(function() {
            const task = $(this).find('span.taskitem').text();  // Get task text
            completedTasks.push({ task: task, completed: true });  // Save as completed
        });
    
        localStorage.setItem('tasks', JSON.stringify([...todoTasks, ...completedTasks]));  // Save all tasks under 'tasks'
    }
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        tasks.forEach(task => {
            const taskItem = `<li class="${task.completed ? 'completed' : ''}">
                <span class="taskitem">${task.task}</span>
                ${task.completed ? '' : `<button class="btn deleteBtn float-end"><span class="material-symbols-outlined">delete</span></button>
                    <button class="btn completeBtn float-end"><span class="material-symbols-outlined">check</span></button>`}
                
            </li>`;
    
            if (task.completed) {
                $('#completed-list').append(taskItem);  
            } else {
                $('#task-list').append(taskItem);  
            }
        });
    }
    function updateTaskCounter() {
        let taskCount = $('#task-list li').length; 
        $('#counter').text(taskCount);  
    }
    
    function updateCompletedCounter() {
        let completedCount = $('#completed-list li').length; 
        $('#completedcounter').text(completedCount);  
    }
    //localStorage.clear();
});


