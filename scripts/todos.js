let todos = [], timer


// Fetch existing todos from localStorage 
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    } 
}

// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
        id: Date.now(),
        text,
        completed: false,
	    time: {
            hrs: 0,
            mins: 0,
            secs: 0
        },
        status: false
    })
    saveTodos()
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id) 

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

const checkStatus = () => {
    const todo = todos.find((todo) => todo.status)

    if (todo) {
        toggleTime(todo.id)
    }
    renderTodos()
}

const toggleTime = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (!todo.status) {
        timer = setInterval(function(){ counter(todo.id) }, 1000)
    } else {
        clearInterval(timer)
    }

    todo.status = !todo.status
    saveTodos()
}

function counter(id) {
    const todo = todos.find((todo) => todo.id === id)

    todo.time.secs++

    saveTodos()
    renderTodos()

    if (todo.time.secs == 59) {
        todo.time.secs = -1
        todo.time.mins++
    }

    if (todo.time.mins == 60) {
        todo.time.mins = 0
        todo.time.hrs++
    }

    saveTodos()
}

loadTodos()

