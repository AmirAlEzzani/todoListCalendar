const prev = document.getElementById('prev');
const next = document.getElementById('next');
const monthName = document.getElementById('monthName');
const yearName = document.getElementById('yearName');
const dates = document.getElementById('dates');


var selectedMonth = 1;

function prevBtn() {
    while (dates.firstChild) {
        dates.removeChild(dates.firstChild);
    }
    selectedMonth--;
    myFunction();
}

function nextBtn() {
    while (dates.firstChild) {
        dates.removeChild(dates.firstChild);
    }
    selectedMonth++;
    myFunction();
}

function myFunction() {
    var today = new Date();
    var numOfDays = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).getDate();
    var month = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).toLocaleString('default', { month: 'long' });
    //console.log(month + " has " + numOfDays + " days.");
    var year = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).getFullYear();
    var firstDay = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 1-numOfDays).getDay();


    for (let j = 0 ; j < firstDay; j++) {
        const firstDayOffset = document.createElement('div');
        dates.appendChild(firstDayOffset);
        firstDayOffset.classList.add('firstDayOffset');
    } 

    for (let i = 1 ; i <= numOfDays; i++) {
        const addDay = document.createElement('button');
        dates.appendChild(addDay);
        addDay.classList.add('day');
        addDay.innerText = i;
    } 


    monthName.innerText = month;
    yearName.innerText = year;
}

myFunction();
prev.addEventListener('click', prevBtn);
next.addEventListener('click', nextBtn);

const addTask = document.getElementById('addTask');
const createTask = document.getElementById('createTask');
const taskName = document.getElementById('taskName');
const todo = document.getElementById('todo');
let taskNum = 0;
function addTaskFunc() {
    
    const taskChild = document.createElement('input');
    taskChild.type = 'text';
    todo.appendChild(taskChild);
    taskChild.value = createTask.value;
    taskChild.setAttribute('readonly', true);
    createTask.value = '';
    taskChild.classList.add('task-'+taskNum);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    todo.append(checkbox);
    checkbox.classList.add('checkbox');
    checkbox.classList.add('task-'+taskNum);

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    todo.append(remove);
    remove.classList.add('removeBtn');
    remove.classList.add('task-'+taskNum);
    taskNum++;
    
    document.querySelectorAll('.removeBtn').forEach(item => {
        item.addEventListener('click', function() {
            let removeMe = item.classList[1];
            console.log(removeMe);
            document.querySelectorAll("."+removeMe).forEach(element => {
                todo.removeChild(element);
            })
        });
    });

    document.querySelectorAll('.checkbox').forEach(item => {
        item.addEventListener('change', function() {
            let checkMe = item.classList[1];
            document.querySelectorAll("." +checkMe).forEach(element => {
                if (item.checked) {
                    if (element.tagName !== 'BUTTON') {
                        element.classList.add('completed');
                    }
                } 
                else {
                    element.classList.remove('completed');
                }
            })
        });
    });
}
addTask.addEventListener('click', addTaskFunc);




