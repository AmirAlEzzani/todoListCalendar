
import { createTasks, removeTask, updateTasks } from './server.js'

document.querySelectorAll('.day').forEach(day => {
    let addBtn = document.querySelector('#addTask')
    addBtn.addEventListener('click', function() {
        let dayTasks = day.getAttribute('tasklist');
        let dayChecks = day.getAttribute('checklist');
        if (dayTasks != null) {
            updateTasks(uid, day.id, dayTasks, dayChecks)
        }
        else if (dayTasks == null) {
            createTasks(uid, day.id, dayTasks, dayChecks)
        }
        document.querySelectorAll('.removeBtn').forEach(remove => {
            let selected = document.querySelector('.selected')
            removeTask(uid, selected.id)
        })
    })
})