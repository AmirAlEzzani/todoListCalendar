
const uid = localStorage.getItem('uidKey')
console.log(uid);

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const monthName = document.getElementById('monthName');
const yearName = document.getElementById('yearName');
const dates = document.getElementById('dates');


let idStorage = [];
let taskStorage = [];
let checkStorage = [];
var selectedMonth = 1;



function prevBtn() {
    while (dates.firstChild) {
        dates.removeChild(dates.firstChild);
    }
    selectedMonth--;

    myFunction();
    document.querySelectorAll('.day').forEach(item => {
        if (item.id != todayId) {
            item.classList.remove('today');
        }
        /* item.style.backgroundColor = 'white'; */
        if (item.classList.contains('today')) {
            /* item.style.backgroundColor = 'wheat'; */
        }
        /*         document.querySelectorAll('.selected').forEach(selected => {
                    selected.addEventListener('click', function() {
                        if (selected.hasAttribute('tasklist')) {
                            updateTaskList();
                            updateCheckList();
                        }
                    })
                }) */
    })
}

function nextBtn() {
    while (dates.firstChild) {
        dates.removeChild(dates.firstChild);
    }
    selectedMonth++;
    myFunction();
    document.querySelectorAll('.day').forEach(item => {
        if (item.id != todayId) {
            item.classList.remove('today');
        }
        /* item.style.backgroundColor = 'white'; */
        if (item.classList.contains('today')) {
            /* item.style.backgroundColor = 'wheat'; */
        }
        /*         document.querySelectorAll('.selected').forEach(selected => {
                    selected.addEventListener('click', function() {
                        if (selected.hasAttribute('tasklist')) {
                            updateTaskList();
                            updateCheckList();
                        }
                    })
                }) */
    })

}
let taskNum = 0;


function dbQuery(dateInput, tasklistInput, checklistInput) {
    let userid = uid
    let date = dateInput
    let tasklist = tasklistInput
    let checklist = checklistInput

    fetch('http://localhost:8000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',              
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
    },
    body: JSON.stringify({ userid, date, tasklist, checklist })
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response;
    })
    .then(data => {
    console.log('Data sent successfully:', data);
    })
    .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    });
}



function dbDelete(dateInput, tasklistInput, checklistInput) {
    let userid = uid;
    let date = dateInput;
    let tasklist = tasklistInput;
    let checklist = checklistInput;
    fetch('mysql://urimitbswz6fapaw:xCe4wNQXOxrAqnzAwfks@bvostjmvsfawpztfr2mk-mysql.services.clever-cloud.com:3306/bvostjmvsfawpztfr2mk', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',                    
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
        }, 
        body: JSON.stringify({ userid, date, tasklist, checklist })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('All tasks deleted successfully');
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}




function myFunction() {
    var today = new Date();
    var numOfDays = new Date(today.getFullYear(), today.getMonth() + selectedMonth, 0).getDate();
    var month = new Date(today.getFullYear(), today.getMonth() + selectedMonth, 0).toLocaleString('default', { month: 'long' });
    //console.log(month + " has " + numOfDays + " days.");
    var year = new Date(today.getFullYear(), today.getMonth() + selectedMonth, 0).getFullYear();
    var firstDay = new Date(today.getFullYear(), today.getMonth() + selectedMonth, 1 - numOfDays).getDay();
    let todaysDate = today.getDate();


    for (let j = 0; j < firstDay; j++) {
        const firstDayOffset = document.createElement('div');
        dates.appendChild(firstDayOffset);
        firstDayOffset.classList.add('firstDayOffset');
    }

    for (let i = 1; i <= numOfDays; i++) {
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
    const tasks = document.getElementById('tasks');
    let selectedDate = document.querySelector('.selected');
    const todo = document.getElementById('todo');
    const title = document.getElementById('title')

    // when page is initially loaded
    document.querySelectorAll('.day').forEach(item => {
        idYear = new Date(today.getFullYear(), today.getMonth() + selectedMonth, 0).getFullYear();
        idMonth = new Date(today.getFullYear(), today.getMonth() + selectedMonth + 1, 0).getMonth();
        idDate = item.innerText;
        fullId = "date-" + idYear + "-" + idMonth + "-" + idDate;
        idYearToday = new Date(today.getFullYear(), today.getMonth(), 0).getFullYear();
        idMonthToday = new Date(today.getFullYear(), today.getMonth()).getMonth() + 1;
        todayId = "date-" + idYearToday + "-" + idMonthToday + "-" + todaysDate;

        item.id = fullId;
        if (item.id == todayId) {
            item.classList.add('today');
        }
        if (item.classList.contains('selected')) {
            /* item.style.backgroundColor = 'burlywood'; */
        }
        if (item.id != todayId) {
            item.classList.remove('today');
        }
        if (item.classList.contains('today')) {
            /* item.style.backgroundColor = 'wheat'; */
            item.classList.add('selected');

        }
        if (item.classList.contains('selected')) {
            /* item.style.backgroundColor = 'burlywood'; */
        }
        else {
            item.classList.remove('selected');
            /* item.style.backgroundColor = 'white'; */
        }


        // when a date is clicked
        item.addEventListener('click', function () {
            taskNum = 0;

            while (taskList.length > 0) {
                taskList.splice(0);


            }

            while (checkList.length > 0) {
                checkList.splice(0);


            }

            const createTaskInput = document.createElement('input');
            const addTaskButton = document.createElement('button');
            createTaskInput.type = 'text';
            createTaskInput.id = 'createTask';
            addTaskButton.innerText = 'Add Task';
            addTaskButton.id = 'addTask';
            let preexistingCreate = document.getElementById('createTask')
            let preexistingAdd = document.getElementById('addTask')
            todo.removeChild(preexistingAdd);
            todo.removeChild(preexistingCreate)
            title.after(addTaskButton);
            title.after(createTaskInput);

            const addTask = document.getElementById('addTask');
            const createTask = document.getElementById('createTask');
            addTask.addEventListener('click', addTaskFunc);





            document.querySelectorAll('.day').forEach(item => {

                item.classList.remove('selected');

                /* item.style.backgroundColor = 'white'; */
                if (item.classList.contains('today')) {
                    /* item.style.backgroundColor = 'wheat'; */
                }
                document.querySelectorAll('.selected').forEach(selected => {
                    selected.addEventListener('click', function () {
                        if (selected.hasAttribute('tasklist')) {
                            updateTaskList();
                            updateCheckList();
                        }
                    })
                })
            });

            item.classList.add('selected');
            removeTaskFunc();
            /* item.style.backgroundColor = 'burlywood'; */
            if (item.hasAttribute('tasklist')) {

            }
            if (item.hasAttribute('checklist')) {

            }

            function displayTasks() {
                if (!item.hasAttribute('tasklist')) {
                    return;
                }
                let separateTasks = item.getAttribute('tasklist').split(',');
                let separateChecks = item.getAttribute('checklist').split(',');
                for (f = 0; f < separateTasks.length; f++) {
                    const displayTask = document.createElement('input');
                    const displayCheck = document.createElement('input');
                    tasks.appendChild(displayTask);

                    tasks.appendChild(displayCheck);
                    displayTask.type = 'text';
                    displayCheck.type = 'checkbox';
                    displayTask.setAttribute('readonly', true);
                    displayTask.value = separateTasks[f];
                    if (separateChecks[f] == 'true') {
                        displayCheck.checked = true;
                    }
                    displayTask.classList.add('task');
                    displayTask.classList.add('task-' + taskNum);

                    displayCheck.classList.add('task');

                    displayCheck.classList.add('checkbox');
                    displayCheck.classList.add('task-' + taskNum);

                    const remove = document.createElement('button');
                    tasks.appendChild(remove);
                    remove.innerText = 'Remove';

                    remove.classList.add('removeBtn');
                    remove.classList.add('task');
                    remove.classList.add('task-' + taskNum);



                    taskNum++;
                    document.querySelectorAll('.task').forEach(i => {
                        document.querySelectorAll('.removeBtn').forEach(item => {
                            item.addEventListener('click', function () {
                                item.classList.add('yo');
                                let matching = item.classList[item.classList.length - 2];

                                document.querySelectorAll('.yo').forEach(split => {

                                    let matchSplit = matching.split('-');
                                    let matchNum = matchSplit[1];
                                    separateTasks.splice(matchNum, 1);
                                    separateChecks.splice(matchNum, 1);

                                    document.querySelectorAll('.selected').forEach(update => {
                                        update.setAttribute('tasklist', separateTasks);
                                        update.setAttribute('checklist', separateChecks);
                                    })
                                })

                                document.querySelectorAll('.task').forEach(i => {
                                    let updateRemove = document.querySelector('.yo')
                                    let removedTaskClass = updateRemove.classList[updateRemove.classList.length - 2];

                                    let removedTaskSplit = removedTaskClass.split('-');
                                    let removedTaskNum = removedTaskSplit[1];

                                    let checkForLaterTasks = i.classList[i.classList.length - 1];
                                    let checkForLaterTasksSplit = checkForLaterTasks.split('-');
                                    let checkIfLaterTaskIsLarger = checkForLaterTasksSplit[1];

                                    if (checkIfLaterTaskIsLarger > removedTaskNum) {

                                        i.classList.add('larger');
                                    }
                                })

                                document.querySelectorAll('.yo').forEach(match => {
                                    let deleteMeId = match.classList[match.classList.length - 2];
                                    let deleteMeSplit = deleteMeId.split('-');
                                    let deleteMeNum = deleteMeSplit[1];
                                    document.querySelectorAll('.task').forEach(matchingId => {

                                        if (matchingId.classList.contains('task-' + deleteMeNum)) {
                                            matchingId.classList.add('removeMe');
                                        }
                                    })
                                    document.querySelectorAll('.removeMe').forEach(deleteMe => {
                                        tasks.removeChild(deleteMe);
                                    });

                                    document.querySelectorAll('.larger').forEach(iShouldBeDecreased => {
                                        iShouldBeDecreased.classList.remove('larger');
                                        let decreaseMe = iShouldBeDecreased.classList[iShouldBeDecreased.classList.length - 1];
                                        let decreaseMeSplit = decreaseMe.split('-');
                                        let decreaseMeNum = decreaseMeSplit[1];
                                        iShouldBeDecreased.classList.remove(decreaseMe);
                                        decreaseMeNum--;
                                        iShouldBeDecreased.classList.add('task-' + decreaseMeNum);

                                    })

                                })

                                taskNum--;



                            })
                            document.querySelectorAll('.checkbox').forEach(check => {
                                check.addEventListener('change', function () {


                                    document.querySelectorAll("." + checkMe).forEach(element => {
                                        
                                        if (check.checked) {

                                            let checkMeSplit = checkMe.split("-");
                                            let checkMeNum = checkMeSplit[1];


                                            separateChecks[checkMeNum] = true;

                                            if (element.tagName !== 'BUTTON') {
                                                element.classList.add('completed');
                                            }
                                        }
                                        else {
                                            element.classList.remove('completed');
                                            let checkMeSplit = checkMe.split("-");
                                            let checkMeNum = checkMeSplit[1];

                                            separateChecks[checkMeNum] = false;

                                        }

                                    });
                                    selectedDate.setAttribute('checklist', separateChecks);

                                    document.querySelectorAll('.day').forEach(day => {
                                        let dayAttribute = day.getAttribute('checklist');
                                        let attributeSplit = dayAttribute.split(',');
                                        if (attributeSplit.includes('false')) {
                                            day.classList.remove('complete');
                                            day.classList.add('incomplete');
                                        }
                                        else if (!attributeSplit.includes('false') && attributeSplit.includes('true')) {
                                            day.classList.remove('incomplete')
                                            day.classList.add('complete');
                                        }
                                    })

                                });
                            });

                        })
                    })
                }
            }
            let selectedDate = document.querySelector('.selected');
            displayTasks();

        });
    });

    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function () {

            checkStorage.push(checkList);

            document.querySelectorAll('.day').forEach(day => {
                let dayAttribute = day.getAttribute('checklist');
                let attributeSplit = dayAttribute.split(',');
                if (attributeSplit.includes('false')) {
                    day.classList.remove('complete');
                    day.classList.add('incomplete');
                }
                else if (!attributeSplit.includes('false') && attributeSplit.includes('true')) {
                    day.classList.remove('incomplete')
                    day.classList.add('complete');
                }
            })


        })
        
    })
}

myFunction();



let taskList = [];
let checkList = [];

function updateTaskList() {
    document.querySelectorAll('.selected').forEach(selected => {
        let listOfTasks = selected.getAttribute('tasklist');
        let taskArray = listOfTasks.split(',');
        taskList = taskArray;
    })
};
function updateCheckList() {
    document.querySelectorAll('.selected').forEach(selected => {
        let listOfChecks = selected.getAttribute('checklist');
        let checkArray = listOfChecks.split(',');
        checkList = checkArray;
    })
};


function removeTaskFunc() {
    document.querySelectorAll('.task').forEach(item => {
        item.remove();
    });
}




function addTaskFunc() {

    if (createTask.value != '') {
        const taskChild = document.createElement('input');
        taskChild.type = 'text';
        tasks.appendChild(taskChild);
        taskChild.value = createTask.value;
        let name = createTask.value; 
        taskChild.setAttribute('readonly', true);
        createTask.value = '';

        taskChild.classList.add('task');
        taskChild.classList.add('task-' + taskNum);
        taskList.push(taskChild.value);
        let selectedDate = document.querySelector('.selected');
        selectedDate.setAttribute('tasklist', taskList);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        tasks.append(checkbox);
        checkbox.classList.add('checkbox');
        checkbox.classList.add('task');
        checkbox.classList.add('task-' + taskNum);
        checkList.push(false);
        selectedDate.setAttribute('checklist', checkList);

        const remove = document.createElement('button');
        remove.innerText = 'Remove';
        tasks.append(remove);
        remove.classList.add('removeBtn');
        remove.classList.add('task');
        remove.classList.add('task-' + taskNum);
        taskNum++;
        let removeId;
        let identifierId;
        let howManyTimes = 0;


        document.querySelectorAll('.task').forEach(i => {
            document.querySelectorAll('.removeBtn').forEach(item => {
                item.addEventListener('click', function () {
                    item.classList.add('yo');

                    document.querySelectorAll('.yo').forEach(getIndex => {
                        let removeMe = getIndex.classList[getIndex.classList.length - 2];

                        let removeMeSplit = removeMe.split("-");

                        let removeMeNum = removeMeSplit[1];



                        howManyTimes++;

                        taskList.splice(removeMeNum, 1);
                        checkList.splice(removeMeNum, 1);

                        console.log('remove')
                        let selected = document.querySelector('.selected')
                        console.log(selected.getAttribute('tasklist'))

                        taskNum--;
                        


                        selected.setAttribute('tasklist', taskList)
                        selected.setAttribute('checklist', checkList)
                                            let selectDate = document.querySelector('.selected');
                        let dateInput = selectDate.id;
                        let tasklistInput = selectDate.getAttribute('tasklist');
                        let checklistInput = selectDate.getAttribute('checklist');
                        console.log(tasklistInput)
                        if (tasklistInput!='') {
                            console.log('updated')
                            dbQuery(dateInput, tasklistInput, checklistInput)
                        }
                        if (tasklistInput == '') {
                            console.log('deleted')
                            dbDelete(dateInput, tasklistInput, checklistInput)
                        }
                        
                    })

                    wakeUp();
                    wakeUp();

                })







            });
        });
        function wakeUp() {
            document.querySelectorAll('.yo').forEach(element => {


                let removeMe = element.classList[element.classList.length - 2];
                document.querySelectorAll("." + removeMe).forEach(item => {
                    item.classList.add('yo');
                });

                let removeMeSplit = removeMe.split("-");

                let removeMeNum = removeMeSplit[1];
                removeId = removeMeNum;


                document.querySelectorAll('.task').forEach(i => {

                    let checkForLaterTasks = i.classList[i.classList.length - 1];
                    let checkForLaterTasksSplit = checkForLaterTasks.split('-');
                    let checkIfLaterTaskIsLarger = checkForLaterTasksSplit[1];
                    if (checkIfLaterTaskIsLarger > removeMeNum) {

                        i.classList.add('larger');
                    }
                    document.querySelectorAll('.yo').forEach(iShouldBeRemoved => {
                        tasks.removeChild(iShouldBeRemoved);

                    })
                    document.querySelectorAll('.larger').forEach(iShouldBeDecreased => {
                        iShouldBeDecreased.classList.remove('larger');
                        let decreaseMe = iShouldBeDecreased.classList[iShouldBeDecreased.classList.length - 1];
                        let decreaseMeSplit = decreaseMe.split('-');
                        let decreaseMeNum = decreaseMeSplit[1];
                        iShouldBeDecreased.classList.remove(decreaseMe);
                        decreaseMeNum--;
                        iShouldBeDecreased.classList.add('task-' + decreaseMeNum);

                    })
                })









                if (identifierId > removeMeNum) {
                    element.classList.add('larger');

                }
            })
        }
        document.querySelectorAll('.checkbox').forEach(item => {
            // Use a flag to check if the listener is already added
            if (!item.dataset.listenerAdded) {
                item.addEventListener('change', function () {
                    let checkMe = item.classList[2];
        
                    document.querySelectorAll("." + checkMe).forEach(element => {
                        if (item.checked) {
                            let checkMeSplit = checkMe.split("-");
                            let checkMeNum = checkMeSplit[1];
                            document.querySelectorAll('.selected').forEach(selected => {
                                let selectId = selected.id;
                                let selectIndex = idStorage.indexOf(selectId);
                                checkStorage.splice(selectIndex, 1, checkList.toString());
        
                                // Log the updated checkStorage
                                console.log(checkStorage);
                            });
        
                            checkList[checkMeNum] = true;
                            selectedDate.setAttribute('checklist', checkList);
        
                            if (element.tagName !== 'BUTTON') {
                                element.classList.add('completed');
                            }
                        } else {
                            element.classList.remove('completed');
                            let checkMeSplit = checkMe.split("-");
                            let checkMeNum = checkMeSplit[1];
        
                            checkList[checkMeNum] = false;
                            selectedDate.setAttribute('checklist', checkList);
                        }
                    });
        
                    document.querySelectorAll('.day').forEach(day => {
                        if (!day.hasAttribute('tasklist')) {
                            return;
                        }
                        let dayAttribute = day.getAttribute('checklist');
                        let attributeSplit = dayAttribute.split(',');
                        if (attributeSplit.includes('false')) {
                            day.classList.remove('complete');
                            day.classList.add('incomplete');
                        } else if (!attributeSplit.includes('false') && attributeSplit.includes('true')) {
                            day.classList.remove('incomplete');
                            day.classList.add('complete');
                        }
                    });
        
                    let selectDate = document.querySelector('.selected');
                    let dateInput = selectDate.id;
                    let tasklistInput = selectDate.getAttribute('tasklist');
                    let checklistInput = selectDate.getAttribute('checklist');
        
                    console.log(selectDate.getAttribute('checklist'));
                    console.log('look');
                    dbQuery(dateInput, tasklistInput, checklistInput);
                });
        
                // Mark the listener as added
                item.dataset.listenerAdded = true;
            }
        });



        document.querySelectorAll('.selected').forEach(selected => {
            let selId = selected.id;
            if (!idStorage.includes(selId)) {
                idStorage.push(selId);
            }
            if (selected.hasAttribute('tasklist')) {


                console.log(selId);
                let index = idStorage.indexOf(selId);
                console.log(index);
                taskStorage.splice(index, 1, selected.getAttribute('tasklist'));
            }
        })


    }
    document.querySelectorAll('.day').forEach(day => {
        let b = idStorage.indexOf(day.id)

        if (day.hasAttribute('checklist')) {
            /* taskStorage.splice(b, 1, day.getAttribute('tasklist')) */
            checkStorage.splice(b, 1, day.getAttribute('checklist'))

        }

    })

    document.querySelectorAll('.day').forEach(day => {
        if (!day.hasAttribute('checklist')) {
            return;
        }
        let dayAttribute = day.getAttribute('checklist');
        let attributeSplit = dayAttribute.split(',');
        if (attributeSplit.includes('false')) {
            day.classList.remove('complete');
            day.classList.add('incomplete');
        }
        else if (!attributeSplit.includes('false') && attributeSplit.includes('true')) {
            day.classList.remove('incomplete')
            day.classList.add('complete');
        }
    })

    let selectDate = document.querySelector('.selected');
    let dateInput = selectDate.id;
    let tasklistInput = selectDate.getAttribute('tasklist');
    let checklistInput = selectDate.getAttribute('checklist');

    console.log('test3')
    dbQuery(dateInput, tasklistInput, checklistInput)

}



addTask.addEventListener('click', addTaskFunc);
prev.addEventListener('click', prevBtn);
next.addEventListener('click', nextBtn);

document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', function () {
        console.log(idStorage);
        console.log(taskStorage);
        console.log(checkStorage);
    })
})



prev.addEventListener('click', function () {
    console.log(idStorage)
    console.log(taskStorage)
    console.log(checkStorage)

    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }

    var today = new Date();

    for (i = 0; i < idStorage.length; i++) {
        let checkMonth = idStorage[i];
        let checkMonthSplit = checkMonth.split('-');
        let checkMonthNum = checkMonthSplit[2];

        if (checkMonthNum == idMonth) {
            document.querySelectorAll('.day').forEach(previouslyStored => {
                let previouslyStoredId = previouslyStored.id;
                if (idStorage[i] == previouslyStoredId) {
                    previouslyStored.setAttribute('tasklist', taskStorage[i])
                    previouslyStored.setAttribute('checklist', checkStorage[i])
                    console.log('tl' + taskList)
                    console.log('ts' + taskStorage)
                }
            })
        }
    }
});


next.addEventListener('click', function () {

    console.log(idStorage)
    console.log(taskStorage)
    console.log(checkStorage)


    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }

    var today = new Date();

    for (i = 0; i < idStorage.length; i++) {
        let checkMonth = idStorage[i];
        let checkMonthSplit = checkMonth.split('-');
        let checkMonthNum = checkMonthSplit[2];

        if (checkMonthNum == idMonth) {
            document.querySelectorAll('.day').forEach(previouslyStored => {
                let previouslyStoredId = previouslyStored.id;
                if (idStorage[i] == previouslyStoredId) {
                    previouslyStored.setAttribute('tasklist', taskStorage[i])
                    previouslyStored.setAttribute('checklist', checkStorage[i])
                    console.log('tl' + taskList)
                    console.log('ts' + taskStorage)
                }
            })
        }
    }
});


async function dbImport() {
    try {
        const response = await fetch('mysql://urimitbswz6fapaw:xCe4wNQXOxrAqnzAwfks@bvostjmvsfawpztfr2mk-mysql.services.clever-cloud.com:3306/bvostjmvsfawpztfr2mk', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',                    
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return data; // Return the fetched data
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        return null; // Return null or rethrow the error
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    let selectDate = document.querySelector('.selected');
    let dateInput = selectDate.id;
    let tasklistInput = selectDate.getAttribute('tasklist');
    let checklistInput = selectDate.getAttribute('checklist');

    dbQuery(dateInput, tasklistInput, checklistInput);
    console.log('dbimport');
    dbImport();
    const taskStoreData = await dbImport();
    let taskStore = taskStoreData[0]
    console.log('Fetched task store data:', taskStore);

    document.querySelectorAll('.day').forEach(item => {
        for (i = 0; i<taskStore.length; i++) {
            let storedTask = taskStore[i]
            if (storedTask.date != null) {
                if (storedTask.date == item.id) {
                    console.log(item.id)
                    item.setAttribute('tasklist', storedTask.tasklist)
                    item.setAttribute('checklist', storedTask.checklist)
                }
        }
        }
    })
});



//for each date in calendar, get the id, go through taskStore, if selected.id == taskStore.value(date) { set the attribute of selected date to the tasklist of that taskStore Id, same with checklist }



    //this updates before the date attribute does, so im gonna have to put this straight into each of the funcs directly