
import { todoService } from '../services/todo.service.js'

import { eventBus } from '../services/event-bus.service.js'

import todoFilter from '../cmps/todo-filter.cmp.js'
import todoList from '../cmps/todo-list.cmp.js'

export default {
    template: `
    <section class="todo-app">
        <todo-filter @setFilterBy="setFilterBy"/>

       <div class="container-add">
           <router-link to="/todo/edit"><span class="add">Add a todo...</span></router-link>
       </div>

        <todo-list v-if="todos && todos.length" 
            @selected="selectTodo" 
            @remove="removeTodo" 
            :todos="todos"/>
    </section>
    `,
    components: {
        todoFilter,
        todoList
    },
    data() {
        return {
            // todos: null,
            // selectedTodo: null,
            // filterBy: {
            //     title: ''
            // },
        }
    },
    created() {
        // this.todos = this.$store.state.todos
    },
    methods: {
        removeTodo(todoId) {
            // Update local storage 
            // todoService.remove(todoId)

            // Update state 
            this.$store.commit({ type: "removeTodo", todoId })

        },
        selectTodo(todo) {
            this.selectedTodo = todo
        },
        todoSaved(todo) {
            this.todos.push(todo)
        },
        setFilterBy(filterBy) {
            this.$store.commit({ type: 'setFilterBy', filterBy })
        },
    },
    created() {
        // this.todosToShow()
    }
    ,
    computed: {
        todos() {
            return this.$store.getters.todosForDisplay
        },
    },
    components: {
        todoFilter,
        todoList,
    }
}

