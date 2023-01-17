import { todoService } from "../services/todo.service.js"
import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="todo-edit">
            <h1>Todo Edit</h1>
            <form @submit.prevent="save">
                <input type="text" v-model="todoToEdit.txt" autofocus>
                <button ref="btn">Save</button>
            </form>
        </section>
        <pre>{{todoToEdit}}</pre>
    `,
    data() {
        return {
            todoToEdit: null,
        }
    },
    created() {
        const todoId = this.$route.params.id
        console.log('todoId', todoId)

        if (todoId) {
            console.log(todoId, 'todoId')
            const todo = todoService.getById(todoId)
            console.log(todo, 'todo')
            this.todoToEdit = todo
        } else {
            this.todoToEdit = todoService.getEmptyTodo()
        }
    },
    mounted() {
        // this.$refs.txt.focus()
        // console.log(this.$refs.btn);
    },
    methods: {
        save() {
            // todoService.save(this.todoToEdit)
            this.$store.commit({ type: "saveTodo", todo: this.todoToEdit })


            this.todoToEdit = null
            this.$router.push('/todo')
        }
    }
}