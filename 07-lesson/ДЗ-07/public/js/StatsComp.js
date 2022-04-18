function statsModule() {
    Vue.component('stats', {
        methods: {
            sendEventToServer(data) {
                this.$parent.postJson('/api/stats', stats)
                    .then(data => {
                        if (data.result === 1) {
                            console.log(data);
                        }
                    })
                    .catch(data => {
                        console.log(data.error);
                    });
            },
        },
        mounted() {
            const self = this;
            this.$root.eventHub.$on('statsEvent', function (data) {
                /* self.sendEventToServer(stats); */
                console.log(data);
            });
        },
        template: '',
    });
}
