import { showSuccessMsg } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="home">
            <h1> HOME</h1>
            <span>
            As its name implies, the To-do list on an article's talk page shows the list of improvements suggested for the article. It is created and formatted using the template. The list is maintained by editors, writers, reviewers or readers like you as a way to focus your collaborative efforts. As such, they represent a tentative consensus that helps improve the efficiency of the editing process
            </span>
            
        </section>
    
    `,
    data() {
        return {
        }
    },
    created() {
        // showSuccessMsg('HomePage Loaded')
    },
    methods: {
    },
    computed: {
    }
}