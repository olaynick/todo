// Элементы на странице
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
const removeBtn = document.querySelector('#clearBtn')


let tasks = []

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function(task){
        renderTask(task)
    });
}


chekEmptyList()

form.addEventListener('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)
taskList.addEventListener('click', importantTask)
removeBtn.addEventListener('click', removeDone)

function addTask(e){
    // Отмена отправки формы, чтобы страница не перезагружалась
    e.preventDefault()

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
        imp: false
    }

    tasks.push(newTask)

    renderTask(newTask)

    //Очистка поля ввода с возвратом фокуса
    taskInput.value = ''
    taskInput.focus()
    chekEmptyList()
    saveToLocalStorage()
}

function deleteTask(e){
    if (e.target.dataset.action !== 'delete') return
        const parentNode = e.target.closest('.list-group-item') 

        const id = parentNode.id

        const index = tasks.findIndex(function (task){
            if (task.id == id) return true
        })

        tasks.splice(index, 1)

        parentNode.remove()
        chekEmptyList()
        saveToLocalStorage()
}

function doneTask(e){
    if (e.target.dataset.action !== 'done') return
        const parentNode = e.target.closest('.list-group-item')

        const id = parentNode.id

        const task = tasks.find(function(task) {
            if  (task.id == id) return true
        })

        task.done = !task.done

        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
        saveToLocalStorage()
}
function importantTask(e){
    if (e.target.dataset.action !== 'imp') return
    const parentNode = e.target.closest('.list-group-item')

    const id = parentNode.id

    const task = tasks.find(function(task) {
        if  (task.id == id) return true
    })

    task.imp = !task.imp

    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--imp')
    saveToLocalStorage()
}

function chekEmptyList(){
    if (tasks.length == 0){
        const emptyList = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.png" alt="Empty" width="48">
            <div class="empty-list__title">список дел пуст</div>
        </li>`
        taskList.insertAdjacentHTML('afterbegin', emptyList)
    } 
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
    const cssClassImp = task.imp ? 'task-title task-title--imp' : 'task-title'
    //Разметка для добавленной задачи
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass} ${cssClassImp}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="imp" class="btn-action">
                <img src="./img/imp.png" alt="Done" width="20" height="20">
             </button>
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.png" alt="Done" width="20" height="20">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.png" alt="Done" width="20" height="20">
            </button>
        </div>
    </li>`

    //Добавление разметки на страницу
    taskList.insertAdjacentHTML('beforeend', taskHTML)
}

// function removeDone(e){
//         for (let i = 0; i < tasks.length; i++){
//             if (tasks[i].done === true) {
//                 tasks = tasks.filter(task => task.done !== true); 
//             }
//         }
//         chekEmptyList()
//         console.log(tasks)
//         saveToLocalStorage()
//     }


function removeDone(){
    const parentNode = document.querySelectorAll('.list-group-item')
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].done === true){
            tasks = tasks.filter(task => task.done !== true)
            console.log('done есть')
            console.log(parentNode)
            parentNode[i].remove()
        }
        
    }
            chekEmptyList()
            console.log(tasks)
            saveToLocalStorage()
            console.log(parentNode)
           
}


    // const childNode = parentNode.querySelector('.task-title')
    // if (childNode.classList.contains('task-title--done')){
    //     console.log('Есть класс done')
    // } else {
    //     console.log('Нет класса done')
    // }     