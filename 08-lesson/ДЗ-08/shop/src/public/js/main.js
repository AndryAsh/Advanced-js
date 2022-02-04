/* import cart from './CartComp.js' */
import products from './ProductsComp.js'
/* import search from './FilterComp.js' */
import error from './ErrorComp.js'
import home from './HomePage.js'
import page_header from './HeaderPage.js'
import router from '../router/router.js'

const eventBus = new Vue();

const appMain = {
    router,
    data: {
        eventBus: eventBus,
    },
    /* el: '#app', */
    components: {
        /* cart, */
        products,
        error,
        /* search, */
        home,
        page_header,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
};

export default appMain;
