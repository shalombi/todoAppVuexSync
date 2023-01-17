import { todoService } from '../services/todo.service.js'

export default {
    props: ['todo'],
    template: `
        <section class="todo-preview" >
            <p  @click="isTaskDone(todo._id)" 
            :class="linkkkkkkeStyle" 
            :class="{overline:todo.isDone }"
            class="cursor-pointer prev-todo-txt todo-txt" 
            > {{ todo.txt }}</p>
        </section>
        <!-- <section><pre>{{todo}}</pre></section> -->
        
    `,
    data() {
        return {
            isDone: null,
        }
    },

    methods: {
        isTaskDone(todoId) {

            // Update store
            this.$store.commit({ type: "isDone", todoId })

            // Update storage service
            const idx = this.$store.state.todos.findIndex(todo => todo._id === todoId)
            const todo = this.$store.state.todos[idx]
            todoService.save(todo)

            // After changing the state, update class by store data
            this.isDone = todo.isDone
        },
    },
    computed: {
        lineStyle() {
            return { overline: this.isDone, mark: !this.isDone }
        },
    }
}