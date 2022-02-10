const error = {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setError(error) {
            this.text = error
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''
        }
    },
    template: `
    <div class="error-msg-srv" v-if="isVisible">
        <button class="btn-error-srv" type="button" @click="setError('')">&times;</button>
        <p>{{ text }}</p>
    </div>
    `
};

export default error;
