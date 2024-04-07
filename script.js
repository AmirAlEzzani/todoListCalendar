const monthYear = document.getElementById('monthYear');
const dates = document.getElementById('dates');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYear.textContent = monthYearString;
}