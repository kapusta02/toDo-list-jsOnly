const addButton = document.querySelector('#create-block-btn');
let posts = JSON.parse(localStorage.getItem('posts')) || [];
const toDoList = document.querySelector('#progress-block-task-to-do');
const inProgressList = document.querySelector('#progress-block-task-in-progress');
const doneList = document.querySelector('#progress-block-task-done');

const createTaskBlock = (post) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('shared-styles');
    const taskText = document.createElement('p');
    taskText.textContent = post.text;
    taskText.classList.add('task-text');
    taskElement.appendChild(taskText);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button-delete');
    deleteButton.textContent = 'Х';
    deleteButton.addEventListener('click', () => {
        posts.splice(posts.indexOf(post), 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        taskElement.remove();
    });

    const progressButton = document.createElement('button');
    progressButton.classList.add('progress-text-button');

    if (post.position === 'inProgress') {
        progressButton.textContent = 'Done >';
    } else if (post.position === 'done') {
        progressButton.textContent = 'Delete';
    } else {
        progressButton.textContent = 'In Progress >';
    }

    progressButton.addEventListener('click', () => {
        if (post.position === 'toDo') {
            inProgressList.appendChild(taskElement);
            post.position = 'inProgress';
            progressButton.textContent = 'Done >';
        } else if (post.position === 'inProgress') {
            doneList.appendChild(taskElement);
            post.position = 'done';
            progressButton.textContent = 'Delete';
        } else {
            posts.splice(posts.indexOf(post), 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            taskElement.remove();
        }
        localStorage.setItem('posts', JSON.stringify(posts));
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-text-button');
    editButton.textContent = 'Edit';
    editButton.classList.add('progress-text-button');
    editButton.addEventListener('click', () => {
        if (post.position === 'inProgress' || post.position === 'toDo') {
            const editText = prompt('Enter new task text:', post.text);
            if (editText !== null) {
                post.text = editText;
                localStorage.setItem('posts', JSON.stringify(posts));
                createTaskBlock(post);
                taskElement.remove();
            }
        }
        else {
            alert(`Can't edit anymore`);
        }
    });

    taskElement.appendChild(deleteButton);
    taskElement.appendChild(progressButton);
    taskElement.appendChild(editButton);

    if (post.position === 'inProgress') {
        inProgressList.appendChild(taskElement);
    } else if (post.position === 'done') {
        doneList.appendChild(taskElement);
    } else {
        toDoList.appendChild(taskElement);
        toDoList.style.display = 'block';
    }
};

for (const post of posts) {
    createTaskBlock(post);
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const text = document.querySelector('#create-block-input').value;
    const post = { text, position: 'toDo' };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    createTaskBlock(post);
});
