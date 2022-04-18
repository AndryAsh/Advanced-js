Vue.component('errors', {
    data() {
        return {
            msgErrorVisible: false,
        }
    },
    methods: {
        errorConnectServer() {
            this.msgErrorVisible = !this.msgErrorVisible;
            console.log(this.msgErrorVisible);
        },
    },
    mounted() {
        const self = this;
        this.$root.eventHub.$on('errorConnectServer', function (error) {
            self.msgErrorVisible = true;
            console.log(self.msgErrorVisible);
        });
    },
    template: `
                <div class="error-msg-srv" :class="{ block: msgErrorVisible, none: !msgErrorVisible }">
                    <h1>Ошибка соединения с сервером!</h1>
                    <button class="btn-error-srv" type="button" @click="errorConnectServer">Закрыть</button>
                </div>
`
});