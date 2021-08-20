renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ''
    }
})

document.querySelector('#archived').addEventListener('click', () => {
    const {searchText, archived} = getFilters()

    document.querySelector('#archived').textContent = (archived) ? 'Archived' : 'Active'
    document.querySelector('#add-todo-input').value = ''
    document.querySelector('#add-todo-input').disabled = !archived
    document.querySelector('#add-todo-submit').disabled = !archived

    setFilters({
        archived: !archived
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})

window.onload = checkStatus