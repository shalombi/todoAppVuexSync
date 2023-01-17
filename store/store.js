import { todoService } from '../services/todo.service.js'
import { utilService } from '../services/util.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'

const { createStore } = Vuex

const storeOptions = {
    // strict: true,
    state() {
        return {
            todos: todoService.query(),
            filterBy: null,
        }
    },
    mutations: {
        removeTodo(state, { todoId }) {
            todoService.remove(todoId)
            const idx = state.todos.findIndex(todo => todo._id === todoId)
            state.todos.splice(idx, 1)

        },
        isDone(state, { todoId }) {
            const idx = state.todos.findIndex(todo => todo._id === todoId)
            console.log(state.todos, '****');
            state.todos[idx].isDone = !state.todos[idx].isDone

        },
        setFilterBy(state, { filterBy }) {
            console.log(';;;ppp', filterBy)
            state.filterBy = filterBy
        },
        saveTodo({ todos }, { todo }) {
            const savedTodo = todoService.save(todo)
            const idx = todos.findIndex(   ({ _id }) => _id === todo._id)
            if (idx !== -1) todos.splice(idx, 1, savedTodo)
            else todos.push(savedTodo)
        }


    },
    getters: {
        todosForDisplay(state) {
            let filteredTodos
            if (!state.filterBy) return state.todos

            const { txt, status } = state.filterBy
            console.log(txt, status, 'txt, status $$$$')
            if (status === 'Active') {
                filteredTodos = state.todos.filter((todo) => !todo.isDone)
            } else if (status === 'Done') {
                filteredTodos = state.todos.filter((todo) => todo.isDone)
            } else {
                filteredTodos = state.todos
                console.log(filteredTodos, 'Status All , filteredTodos')
            }

            filteredTodos = filteredTodos.filter((todo) => new RegExp(txt, 'i').test(todo.txt))
            console.log(filteredTodos, '%%%% filteredTodos %%%%')
            return filteredTodos
        },
    }
}



export const store = createStore(storeOptions)