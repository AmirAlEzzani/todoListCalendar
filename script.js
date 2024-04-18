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
    let todaysDate = today.getDate();
    

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

    const addTask = document.getElementById('addTask');
    const createTask = document.getElementById('createTask');
    const taskName = document.getElementById('taskName');
    const todo = document.getElementById('tasks');

    // when page is initially loaded
    document.querySelectorAll('.day').forEach(item => {
        idYear = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).getFullYear();
        idMonth = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).getMonth();
        idDate = item.innerText;
        fullId = "date-" + idYear + "-" + idMonth + "-" + idDate;
        item.id = fullId;
        if (item.innerText == new Date().getDate()) {
            item.style.backgroundColor = 'wheat';
            item.classList.add('selected');
        }
        else {
            item.classList.remove('selected');
            item.style.backgroundColor = 'white';
        }
        let selectedDate = document.querySelector('.selected');
        
        // when a date is clicked
        item.addEventListener('click', function() {
            document.querySelectorAll('.day').forEach(item => {
                item.classList.remove('selected');
                item.style.backgroundColor = 'white';
            });
            console.log(data);
            item.style.backgroundColor = 'wheat';
            item.classList.add('selected');
            removeTaskFunc();
            selectedDate.appendChild(data);
            console.log(taskList);
            data.classList.add(item.id);
            item.style.backgroundColor = 'burlywood';

        });
    });
}

myFunction();
prev.addEventListener('click', prevBtn);
next.addEventListener('click', nextBtn);

let data = document.createElement('div');
data.classList.add('hidden');
data.classList.add(fullId);

let taskNum = 0;
let taskList = [];
let checkList = [];
function removeTaskFunc() {
    document.querySelectorAll('.task').forEach(item => {
        item.remove();
    });
}
function addTaskFunc() {
    

    const taskChild = document.createElement('input');
    taskChild.type = 'text';
    todo.appendChild(taskChild);
    taskChild.value = createTask.value;
    taskChild.setAttribute('readonly', true);
    createTask.value = '';
    taskChild.classList.add('task');
    taskChild.classList.add('task-'+taskNum);
    taskList.push(taskChild.value);
    console.log(taskList);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    todo.append(checkbox);
    checkbox.classList.add('checkbox');
    checkbox.classList.add('task');
    checkbox.classList.add('task-'+taskNum);
    checkList.push(false);
    selectedDate.removeChild(data);
    data.innerText = taskList + " &+& " + checkList;
    selectedDate.appendChild(data);
    console.log(data);

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    todo.append(remove);
    remove.classList.add('removeBtn');
    remove.classList.add('task');
    remove.classList.add('task-'+taskNum);
    taskNum++;
    
    document.querySelectorAll('.removeBtn').forEach(item => {
        item.addEventListener('click', function() {
            let removeMe = item.classList[2];
            console.log(removeMe);
            document.querySelectorAll("."+removeMe).forEach(element => {
                todo.removeChild(element);
                let removeMeSplit = removeMe.split("-");
                let removeMeNum = removeMeSplit[1];
                let moveDownOne = removeMeNum;
                console.log(removeMeNum);
                taskList.splice(removeMeNum);
                checkList.splice(removeMeNum);
            });
            selectedDate.removeChild(data);
            data.innerText = taskList + " &+& " + checkList;
            selectedDate.appendChild(data);
            console.log(data);
            
        });
    });

    document.querySelectorAll('.checkbox').forEach(item => {
        item.addEventListener('change', function() {
            let checkMe = item.classList[2];
            document.querySelectorAll("." +checkMe).forEach(element => {
                if (item.checked) {
                    console.log(checkMe);
                    let checkMeSplit = checkMe.split("-");
                    let checkMeNum = checkMeSplit[1];
                    console.log(checkMeNum);
                    checkList[checkMeNum] = true;
                    console.log(checkList);

                    if (element.tagName !== 'BUTTON') {
                        element.classList.add('completed');
                    }
                } 
                else {
                    element.classList.remove('completed');
                    let checkMeSplit = checkMe.split("-");
                    let checkMeNum = checkMeSplit[1];
                    console.log(checkMeNum);
                    checkList[checkMeNum] = false;
                    console.log(checkList);
                }
            });
            selectedDate.removeChild(data);
            data.innerText = taskList + " &+& " + checkList;
            selectedDate.appendChild(data);
            console.log(data);
        });
    });
}



addTask.addEventListener('click', addTaskFunc);


