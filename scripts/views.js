// Render application todos based on filters 
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const { searchText, archived } = getFilters()
    const filterTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const archivedMatch = (archived && todo.completed) || (!archived && !todo.completed)
         
        return searchTextMatch && archivedMatch
    })
    
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(archived, filterTodos))
    
    if (filterTodos.length > 0) {
        filterTodos.slice().reverse().forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = (archived) ? 'Complete some to-do' : 'Add a new one'
        todoEl.appendChild(messageEl)
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const containerEl2 = document.createElement('div')
    const timeEl = document.createElement('span')
    const removeButton = document.createElement('button')
    
    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        if (todo.status) {
            toggleTime(todo.id)
        }
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup the todo text
    todoText.textContent = todo.text
    todoText.classList.add('woo')
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup time string
    const h = (todo.time.hrs < 10) ? '0' + todo.time.hrs : todo.time.hrs
    const m = (todo.time.mins < 10) ? '0' + todo.time.mins : todo.time.mins
    const s = (todo.time.secs < 10) ? '0' + todo.time.secs : todo.time.secs
    const timeString = `${h}:${m}:${s}`

    // Setup timeEl text
    timeEl.textContent = timeString
    containerEl2.appendChild(timeEl)

    // Setup the time button
    if (!todo.completed) {
        const timeButton = document.createElement('button')
        timeButton.textContent = (todo.status) ? 'Stop' : 'Start'
        timeButton.classList.add('button', 'button--text')
        containerEl2.appendChild(timeButton)
        timeButton.addEventListener('click', () => {
            if (!todo.status) {
                checkStatus()
            }
            toggleTime(todo.id)
            renderTodos()
        })
    }

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    containerEl2.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    // Setup container2
    containerEl2.classList.add('list-item__container')
    todoEl.appendChild(containerEl2)
    
    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (archived, filterTodos) => {
    const summary = document.createElement('h2')
    const plural = filterTodos.length === 1 ? '' : 's'
    const decider = (archived) ? 'completed' : 'uncompleted'
    
    summary.classList.add('list-title')
    summary.textContent = `You have ${filterTodos.length} ${decider} todo${plural}`

    return summary
}
