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
    document.querySelectorAll('.day').forEach(item => {
        if (item.id != todayId) {
            item.classList.remove('today');
        }
        item.style.backgroundColor = 'white';
        if (item.classList.contains('today')) {
            item.style.backgroundColor = 'wheat';
        }
        document.querySelectorAll('.selected').forEach(selected => {
            selected.addEventListener('click', function() {
                if (selected.hasAttribute('tasklist')) {
                    updateTaskList();
                    updateCheckList();
                }
            })
        })
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
        item.style.backgroundColor = 'white';
        if (item.classList.contains('today')) {
            item.style.backgroundColor = 'wheat';
        }
        document.querySelectorAll('.selected').forEach(selected => {
            selected.addEventListener('click', function() {
                if (selected.hasAttribute('tasklist')) {
                    updateTaskList();
                    updateCheckList();
                }
            })
        })
    })
    
}
let taskNum = 0;
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
    const tasks = document.getElementById('tasks');
    let selectedDate = document.querySelector('.selected');
    const todo = document.getElementById('todo');
    const title = document.getElementById('title')

    // when page is initially loaded
    document.querySelectorAll('.day').forEach(item => {
        idYear = new Date(today.getFullYear(), today.getMonth()+selectedMonth, 0).getFullYear();
        idMonth = new Date(today.getFullYear(), today.getMonth()+selectedMonth+1, 0).getMonth();
        idDate = item.innerText;
        fullId = "date-" + idYear + "-" + idMonth + "-" + idDate;
        idYearToday = new Date(today.getFullYear(), today.getMonth(), 0).getFullYear();
        idMonthToday = new Date(today.getFullYear(), today.getMonth()).getMonth()+1;
        todayId = "date-" + idYearToday + "-" + idMonthToday + "-" + todaysDate;
        console.log(todayId);
        item.id = fullId;
        if (item.id == todayId) {
            item.classList.add('today');
        }
        if (item.classList.contains('selected')) {
            item.style.backgroundColor = 'burlywood';
        }
        if (item.id != todayId) {
            item.classList.remove('today');
        }
        if (item.classList.contains('today')) {
            item.style.backgroundColor = 'wheat';
            item.classList.add('selected');
            
        }
        if (item.classList.contains('selected')) {
            item.style.backgroundColor = 'burlywood';
        }
        else {
            item.classList.remove('selected');
            item.style.backgroundColor = 'white';
        }

        
        // when a date is clicked
        item.addEventListener('click', function() {
            
            taskNum = 0;
            while (taskList.length > 0) {
                taskList.splice(0);
                console.log(taskList);
                console.log('removed');

            }

            while (checkList.length > 0) {
                checkList.splice(0);
                console.log(checkList);
                console.log('removed');

            }

            const createTaskInput = document.createElement('input');
            const addTaskButton = document.createElement('button');
            createTaskInput.type = 'text';
            createTaskInput.id = 'createTask';
            addTaskButton.innerText = 'Add Task';
            addTaskButton.id = 'addTask';

            if (document.querySelector('#addTask') == true) {

            }
            else {
                title.after(addTaskButton);
                title.after(createTaskInput);
                
                const addTask = document.getElementById('addTask');
                const createTask = document.getElementById('createTask');
                addTask.addEventListener('click', addTaskFunc);
            }


            document.querySelectorAll('.day').forEach(item => {

                item.classList.remove('selected');

                item.style.backgroundColor = 'white';
                if (item.classList.contains('today')) {
                    item.style.backgroundColor = 'wheat';
                }
                document.querySelectorAll('.selected').forEach(selected => {
                selected.addEventListener('click', function() {
                    if (selected.hasAttribute('tasklist')) {
                        updateTaskList();
                        updateCheckList();
                    }
                })
            })
            });

            item.classList.add('selected');
            removeTaskFunc();
            item.style.backgroundColor = 'burlywood';
            if (item.hasAttribute('tasklist')) {
                console.log(item.innerText + " "+ item.getAttribute('tasklist'));
            }
            if (item.hasAttribute('checklist')) {
                console.log(item.innerText + " "+ item.getAttribute('checklist'));
            }

function displayTasks() {

    let separateTasks = item.getAttribute('tasklist').split(',');
    let separateChecks = item.getAttribute('checklist').split(',');
    for (joe = 0; joe<separateTasks.length;joe++) {
        const displayTask = document.createElement('input');
        tasks.appendChild(displayTask);
        const displayCheck = document.createElement('input');
        tasks.appendChild(displayCheck);
        displayTask.type = 'text';
        displayCheck.type = 'checkbox';
        displayTask.setAttribute('readonly', true);
        displayTask.value = separateTasks[joe];
        if (separateChecks[joe] == 'true') {
            displayCheck.checked = true;
        }
        displayTask.classList.add('task');
        displayTask.classList.add('task-'+taskNum);

        displayCheck.classList.add('task');

        displayCheck.classList.add('checkbox');
        displayCheck.classList.add('task-'+taskNum);

        const remove = document.createElement('button');
        tasks.appendChild(remove);
        remove.innerText = 'Remove';
        
        remove.classList.add('removeBtn');
        remove.classList.add('task');
        remove.classList.add('task-'+taskNum);



        taskNum++;
        document.querySelectorAll('.task').forEach(i => {
        document.querySelectorAll('.removeBtn').forEach(item => {
            item.addEventListener('click', function() {
                item.classList.add('yo');
                let matching = item.classList[item.classList.length-2];  
                console.log('matching'+matching);
                document.querySelectorAll('.yo').forEach(split => {
                    console.log('once');
                    let matchSplit = matching.split('-');
                    let matchNum = matchSplit[1];
                    separateTasks.splice(matchNum, 1);
                    separateChecks.splice(matchNum, 1);
                    console.log(separateTasks);
                    console.log(separateChecks);
                    document.querySelectorAll('.selected').forEach(update => {
                        update.setAttribute('tasklist', separateTasks);
                        update.setAttribute('checklist', separateChecks);
                    })
                })

                document.querySelectorAll('.task').forEach(i => {
                    let updateRemove = document.querySelector('.yo')
                    let removedTaskClass = updateRemove.classList[updateRemove.classList.length-2]; 
                    
                    let removedTaskSplit = removedTaskClass.split('-');
                    let removedTaskNum = removedTaskSplit[1];
                    console.log('removenum'+removedTaskNum)
                    let checkForLaterTasks = i.classList[i.classList.length-1];
                    let checkForLaterTasksSplit = checkForLaterTasks.split('-');
                    let checkIfLaterTaskIsLarger = checkForLaterTasksSplit[1];
                    console.log('checklarge'+checkForLaterTasks)
                    if (checkIfLaterTaskIsLarger > removedTaskNum) {
                        console.log('test' + checkIfLaterTaskIsLarger);
                        i.classList.add('larger');
                    }})

                    document.querySelectorAll('.yo').forEach(match => {
                        let deleteMeId = match.classList[match.classList.length-2];
                        let deleteMeSplit = deleteMeId.split('-');
                        let deleteMeNum = deleteMeSplit[1];
                        document.querySelectorAll('.task').forEach(matchingId => {
                            console.log(matchingId.classList)
                            if (matchingId.classList.contains('task-'+deleteMeNum)) {
                            matchingId.classList.add('removeMe');
                            }
                        })
                        document.querySelectorAll('.removeMe').forEach(deleteMe => {
                            tasks.removeChild(deleteMe);
                        });
                        
                        document.querySelectorAll('.larger').forEach(iShouldBeDecreased =>{
                            iShouldBeDecreased.classList.remove('larger');
                            let decreaseMe = iShouldBeDecreased.classList[iShouldBeDecreased.classList.length-1];
                            let decreaseMeSplit = decreaseMe.split('-');
                            let decreaseMeNum = decreaseMeSplit[1];
                            iShouldBeDecreased.classList.remove(decreaseMe);
                            decreaseMeNum--;
                            iShouldBeDecreased.classList.add('task-'+decreaseMeNum);
            
                        })

                    })

                    taskNum--;
                


            })
            document.querySelectorAll('.checkbox').forEach(check => {
                check.addEventListener('change', function() {
                    let checkMe = check.classList[2];
                    

                    document.querySelectorAll("." +checkMe).forEach(element => {
                        if (check.checked) {
                            
                            let checkMeSplit = checkMe.split("-");
                            let checkMeNum = checkMeSplit[1];
                            console.log(separateChecks)
        
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

let idStorage = [];
let taskStorage = [];
let checkStorage = [];

function addTaskFunc() {
    
    const taskChild = document.createElement('input');
    taskChild.type = 'text';
    tasks.appendChild(taskChild);
    taskChild.value = createTask.value;
    taskChild.setAttribute('readonly', true);
    createTask.value = '';
    taskChild.classList.add('task');
    taskChild.classList.add('task-'+taskNum);
    taskList.push(taskChild.value);
    let selectedDate = document.querySelector('.selected');
    selectedDate.setAttribute('tasklist', taskList);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    tasks.append(checkbox);
    checkbox.classList.add('checkbox');
    checkbox.classList.add('task');
    checkbox.classList.add('task-'+taskNum);
    checkList.push(false);
    selectedDate.setAttribute('checklist', checkList);
    console.log(taskList);
    console.log(checkList);

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    tasks.append(remove);
    remove.classList.add('removeBtn');
    remove.classList.add('task');
    remove.classList.add('task-'+taskNum);
    taskNum++;
    let removeId;
    let identifierId;
    let howManyTimes = 0;
    document.querySelectorAll('.task').forEach(i => {
        document.querySelectorAll('.removeBtn').forEach(item => {
            item.addEventListener('click', function() {
                
                item.classList.add('yo');

                document.querySelectorAll('.yo').forEach(getIndex => {
                    let removeMe = getIndex.classList[getIndex.classList.length-2];
                
                    let removeMeSplit = removeMe.split("-");
    
                    let removeMeNum = removeMeSplit[1];
                    console.log(taskList);
                    
                    
                howManyTimes++;
                console.log(howManyTimes +'times');
                    console.log(removeMeNum);
                    taskList.splice(removeMeNum, 1);
                    checkList.splice(removeMeNum, 1);
                    console.log(taskList);
                    console.log(checkList);
    
                    taskNum--;
                })

                wakeUp();
                wakeUp();

                })







            });
        });
    function wakeUp() {
        document.querySelectorAll('.yo').forEach(element => {


            let removeMe = element.classList[element.classList.length-2];
            document.querySelectorAll("."+removeMe).forEach(item => {
                item.classList.add('yo');
            });

            let removeMeSplit = removeMe.split("-");

            let removeMeNum = removeMeSplit[1];
            removeId = removeMeNum;


            document.querySelectorAll('.task').forEach(i => {

            let checkForLaterTasks = i.classList[i.classList.length-1];
            let checkForLaterTasksSplit = checkForLaterTasks.split('-');
            let checkIfLaterTaskIsLarger = checkForLaterTasksSplit[1];
            if (checkIfLaterTaskIsLarger > removeMeNum) {

                i.classList.add('larger');
            }
            document.querySelectorAll('.yo').forEach(iShouldBeRemoved => {
                tasks.removeChild(iShouldBeRemoved);

            })
            document.querySelectorAll('.larger').forEach(iShouldBeDecreased =>{
                iShouldBeDecreased.classList.remove('larger');
                let decreaseMe = iShouldBeDecreased.classList[iShouldBeDecreased.classList.length-1];
                let decreaseMeSplit = decreaseMe.split('-');
                let decreaseMeNum = decreaseMeSplit[1];
                iShouldBeDecreased.classList.remove(decreaseMe);
                decreaseMeNum--;
                iShouldBeDecreased.classList.add('task-'+decreaseMeNum);

            })
        })






            let selectedDate = document.querySelector('.selected');
            selectedDate.setAttribute('tasklist', taskList);
            selectedDate.setAttribute('checklist', checkList);




            if (identifierId>removeMeNum) {
                element.classList.add('larger');

            }
        })
    }

    document.querySelectorAll('.checkbox').forEach(item => {
        item.addEventListener('change', function() {
            let checkMe = item.classList[2];
            
            document.querySelectorAll("." +checkMe).forEach(element => {
                if (item.checked) {
                    
                    let checkMeSplit = checkMe.split("-");
                    let checkMeNum = checkMeSplit[1];
                    console.log(checkList)

                    checkList[checkMeNum] = true;

                    if (element.tagName !== 'BUTTON') {
                        element.classList.add('completed');
                    }
                } 
                else {
                    element.classList.remove('completed');
                    let checkMeSplit = checkMe.split("-");
                    let checkMeNum = checkMeSplit[1];
   
                    checkList[checkMeNum] = false;

                }
                
            });
            selectedDate.setAttribute('checklist', checkList);
        });
    });

    document.querySelectorAll('.day').forEach(day => {
        if (day.hasAttribute('tasklist')) {
            let tempId = day.id;
            if (idStorage.includes(tempId)) {
                let repeatIndex = idStorage.indexOf(tempId)
                console.log(repeatIndex)
                idStorage.splice(repeatIndex);
                taskStorage.splice(repeatIndex);
                checkStorage.splice(repeatIndex);
            }
            idStorage.push(tempId);
            taskStorage.push(day.getAttribute('tasklist'));
            checkStorage.push(day.getAttribute('checklist'));
            console.log(idStorage);
            console.log(taskStorage);
            console.log(checkStorage);

        }
})
}




addTask.addEventListener('click', addTaskFunc);
prev.addEventListener('click', prevBtn);
next.addEventListener('click', nextBtn);

prev.addEventListener('click', function() {
    let add = document.querySelector('#addTask');
    let create = document.querySelector('#createTask');
    todo.removeChild(add);
    todo.removeChild(create);
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }

    var today = new Date();
    var idMonth = new Date(today.getFullYear(), today.getMonth()+selectedMonth+1, 0).getMonth();
    console.log(idMonth+'LOOOOOOOK')
    for (i = 0; i<idStorage.length;i++) {
        let checkMonth = idStorage[i];
        let checkMonthSplit = checkMonth.split('-');
        let checkMonthNum = checkMonthSplit[2];
        console.log('month' + checkMonthNum)
        if (checkMonthNum == idMonth) {
            console.log('idstorage'+idStorage)
            document.querySelectorAll('.day').forEach(previouslyStored => {
                let previouslyStoredId = previouslyStored.id;
                console.log('check' + previouslyStoredId);
                if (idStorage.includes(previouslyStoredId)) {
                    console.log('AAAAAAAAAA'+previouslyStoredId);
                    previouslyStored.setAttribute('tasklist', taskStorage[i]);
                    previouslyStored.setAttribute('checklist', checkStorage[i]);
                }
            })
        }
    }
 });


 next.addEventListener('click', function() {
     let add = document.querySelector('#addTask');
     let create = document.querySelector('#createTask');
     todo.removeChild(add);
     todo.removeChild(create);
     while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }

    var today = new Date();
    var idMonth = new Date(today.getFullYear(), today.getMonth()+selectedMonth+1, 0).getMonth();
    console.log(idMonth+'LOOOOOOOK')
    for (i = 0; i<idStorage;i++) {
        let checkMonth = idStorage[i];
        let checkMonthSplit = checkMonth.split('-');
        let checkMonthNum = checkMonthSplit[2];
        console.log('month' + checkMonthNum)
        if (checkMonthNum == idMonth) {
            document.querySelectorAll('.day').forEach(previouslyStored => {
                let previouslyStoredId = previouslyStored.id;
                if (idStorage.includes(previouslyStoredId)) {
                    console.log('AAAAAAAAAA'+previouslyStoredId);
                }
            })
        }
    }
 });