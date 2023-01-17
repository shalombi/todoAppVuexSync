// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
    get,
    // isDone,
}


var gTodos = _createTodos()

// TODO: support paging and filtering and sorting
function query() {
    const todos = JSON.parse(JSON.stringify(gTodos))
    return todos
}

function getById(id) {
    return gTodos.find(todo => todo._id === id)
}

function remove(id) {
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos.splice(idx, 1)
    utilService.saveToStorage(KEY, gTodos)
}

function save(todo) {
    // const todoToSave = JSON.parse(JSON.stringify(todo))
    // const savedTodo = (todoToSave._id) ? _update(todoToSave) : _add(todoToSave)

    // utilService.saveToStorage(KEY, gTodos)
    // return savedTodo

    const todoToSave = JSON.parse(JSON.stringify(todo))
    const savedTodo = (todoToSave._id) ? _update(todoToSave) : _add(todoToSave)
    utilService.saveToStorage(KEY, gTodos)
    return savedTodo
}

// function get(todoId) {
//     const idx = gTodos.findIndex(currTodo => currTodo._id === todoId)
//     return gTodos[idx]


// }



// const todoToSave = JSON.parse(JSON.stringify(todo))
// if (todoToSave._id) {
// const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
// state.todos.splice(idx, 1, todo)
// } 

// else{
//     todo._id = utilService.makeId()
//     state.todos.push(todo)
// } 





function queryEnt(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return entities
}

function get(entityType, entityId) {
    const entities = queryEnt(entityType)
    const entity = entities => entities.find(entity => entity.id === entityId)

    return entity
}

// function query(entityType) {
//     return JSON.parse(localStorage.getItem(entityType)) || []
//     // return new Promise(resolve => setTimeout(() => resolve(entities), delay))
// }

function _add(todo) {
    todo._id = utilService.makeId()
    gTodos.push(todo)
    return todo
}

function _update(todo) {
    const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
    gTodos.splice(idx, 1, todo)
    return todo
}

function getEmptyTodo() {
    return {
        _id: '',
        txt: '',
        isDone: false
    }
}

function _createTodos() {
    var todos = utilService.loadFromStorage(KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo('Make sport'), _createTodo('Enjoy'), _createTodo('Sleep good')]
        utilService.saveToStorage(KEY, todos)
    }
    return todos
}

function _createTodo(txt) {
    return {
        _id: utilService.makeId(),
        txt,
        isDone: false
    }
}

// function isDone(todoId){
//     const idx = gTodos.findIndex(todo => todo._id === id)
//     gTodos.splice(idx, 1)
//     utilService.saveToStorage(KEY, gTodos)

//     this.isDone = this.$store.state.todos[idx].isDone
// }

