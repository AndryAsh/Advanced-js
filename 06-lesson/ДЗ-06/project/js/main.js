const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const eventHub = new Vue();

/* eventHub.$on('search-product', function (msg) {
    console.log(msg)
}); */

const app = new Vue({
    el: '#app',
    data: {
        eventHub: eventHub,
        /* catalogURL: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: './img/no_image-1200x630.png', */
        /* basket: {
            'amount': 0,
            'countGoods': 0,
            'contents': {}
        },
        getBasketURL: '/getBasket.json',
        addBasketURL: '/addToBasket.json',
        delBasketURL: '/deleteFromBasket.json', */
        /* searchLine: '',
        searchVisible: true, */
        /* isVisibleCart: false,
        plugBasket: 'В корзине нет товаров',
        plug: false, */
    },  /* data */
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    /* this.$emit('errorConnectServer'); */
                    console.log(error);
                })
        },
        /* visibilityBasket: () => {
            $root.$refs.basket.visibilityBasket();
        }, */
        /* addToBasket(product) {
            this.getJson(`${API + this.addBasketURL}`)
                .then(data => {
                    if (data.result === 1) {
                        if (Object.keys(this.basket.contents).includes(String(product.id_product))) {
                            this.basket.contents[product.id_product].quantity++;
                            this.updateBasket();
                        } else {
                            this.basket.contents[product.id_product] = JSON.parse(JSON.stringify(product));
                            this.basket.contents[product.id_product].quantity = 1;
                            this.updateBasket();
                            this.plugVisible();
                        }

                    }
                });
        },
        delFromBasket(product) {
            this.getJson(`${API + this.delBasketURL}`)
                .then(data => {
                    if (data.result === 1) {
                        if (this.basket.contents[product.id_product].quantity === 1) {
                            delete this.basket.contents[product.id_product];
                            this.updateBasket();
                            this.plugVisible();
                        } else {
                            this.basket.contents[product.id_product].quantity--;
                            this.updateBasket();
                        }
                    }
                })
        },
        calcSum() {
            return Object.values(this.basket.contents).reduce((sum, el) => sum + el.price * el.quantity, 0);
        },
        calcCountGoods() {
            return Object.values(this.basket.contents).reduce((sum, el) => sum + el.quantity, 0);
        },
        updateBasket() {
            this.basket.amount = this.calcSum();
            this.basket.countGoods = this.calcCountGoods();
        }, */
        /* FilterGoods(line) {
            let regexp = new RegExp(line, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.searchVisible = false;
        }, */
        /* visibilityBasket(isVisibleCart) {
            this.isVisibleCart = !isVisibleCart;
        },
        plugVisible() {
            if (Object.keys(this.basket.contents).length === 0) {
                this.plug = false;
            } else {
                this.plug = true;
            }
        }, */
    },  /* methods */
    computed: {
        /* plugVisible() {
            if (Object.keys(this.basket.contents).length === 0) {
                this.plug = false;
            } else {
                this.plug = true;
            }
        }, */
    }, /* computed */
    beforeCreate() { },
    created() {
        /* this.getJson(`${API + this.catalogURL}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.filtered = JSON.parse(JSON.stringify(this.products));
            }); */
        /* this.getJson(`${API + this.getBasketURL}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.contents[el.id_product] = el;
                }
                this.basket.amount = data.amount;
                this.basket.countGoods = data.countGoods;
                this.plugVisible();
            }); */
    },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
});