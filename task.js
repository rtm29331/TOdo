const addBtn = document.getElementById('add-task');
const stateBtns = document.querySelectorAll('input[name="state"]')
const taskLists = [];

addBtn.addEventListener('click', () => {
    // get form input value
    const inputValue = document.getElementById('new-task').value;
    const task = {
        comment: inputValue,
        state: 'wip'
    }
    taskLists.push(task);
    // form reset
    document.getElementById('new-task').value = '';
    // show table row
    if (taskLists.length > 0) {
        createTaskList(taskLists, checkDisplayState());
    }
});

stateBtns.forEach(stateBtn => {
    stateBtn.addEventListener('change', () => {
        createTaskList(taskLists, stateBtn.value)
    });
});

function createTaskList(taskLists, selectedState) {
    const rowElements = [];
    taskLists.forEach((task, index) => {
        let btnValue = '完了';
        if (task.state === 'wip') {
            btnValue = '途中';
        }

        // Set contents to row elements.
        if (selectedState === 'all' || task.state === selectedState) {
            // Create table row element s.
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            const commentCell = document.createElement('td');
            const stateCell = document.createElement('td');
            const stateBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');

            idCell.innerText = index;
            commentCell.innerText = task.comment;
            stateBtn.innerText = btnValue;
            stateBtn.addEventListener('click', () => changeState(index));
            deleteBtn.innerText = '削除';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            stateCell.appendChild(stateBtn);
            stateCell.appendChild(deleteBtn);
            row.appendChild(idCell);
            row.appendChild(commentCell);
            row.appendChild(stateCell);
            rowElements.push(row);
        }
    });
    showTaskList(rowElements);
}

function showTaskList(rowElements) {
    const targetElem = document.getElementById('table-body');
    // targetElemが子要素を持っていたら初期化
    if (targetElem.hasChildNodes()) {
        targetElem.innerHTML = '';
    }
    rowElements.forEach(row => {
        targetElem.appendChild(row);
    })
}

function deleteTask(index) {
    taskLists.splice(index, 1);
    createTaskList(taskLists, checkDisplayState())
}

function changeState(index) {
    const task = taskLists[index];
    if (task.state === 'wip') {
        task.state = 'done';
    } else {
        task.state = 'wip';
    }
    stateBtns.forEach(stateBtn => {
        if (stateBtn.checked) {
            createTaskList(taskLists, checkDisplayState());
        }
    });
}

function checkDisplayState() {
    let displayState = 'all';
    stateBtns.forEach(stateBtn => {
        if (stateBtn.checked) {
            displayState = stateBtn.value;
        }
    });
    return displayState;
}