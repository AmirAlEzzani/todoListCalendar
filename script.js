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
    console.log(month + " has " + numOfDays + " days.");
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