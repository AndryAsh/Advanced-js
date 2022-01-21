const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogURL: '/catalogData.json',
        products: [],
        imgCatalog: './img/no_image-1200x630.png',
        basket: {
            'amount': 0,
            'countGoods': 0,
            'contents': {
                /* '123': {
                    "id_product": 123,
                    "product_name": "Ноутбук",
                    "price": 45600,
                    "quantity": 1
                },
                '456': {
                    "id_product": 456,
                    "product_name": "Мышка",
                    "price": 1000,
                    "quantity": 1
                } */
            }
        },
        getBasketURL: '/getBasket.json',
        addBasketURL: '/addToBasket.json',
        delBasketURL: '/deleteFromBasket.json',
        searchLine: '',
        isVisibleCart: false,
        plugBasket: 'В корзине нет товаров',
        plug: false,
    },  /* data */
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addToBasket(product) {
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
        },
        FilterGoods(line) {
            if (result = this.products.find(el => el.product_name === line)) {
                console.log(result);
            } else {
                console.log('Товар не найден');
            }
            this.searchLine = '';
        },
        visibilityBasket(isVisibleCart) {
            this.isVisibleCart = !isVisibleCart;
        },
        plugVisible() {
            if (Object.keys(this.basket.contents).length === 0) {
                this.plug = false;
            } else {
                this.plug = true;
            }
        },
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
        this.getJson(`${API + this.catalogURL}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.getBasketURL}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.contents[el.id_product] = el;
                }
                this.basket.amount = data.amount;
                this.basket.countGoods = data.countGoods;
                this.plugVisible();
            });
    },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
});