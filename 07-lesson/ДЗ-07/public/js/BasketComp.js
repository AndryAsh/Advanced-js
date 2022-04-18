/* const moment = require('moment'); */       // Пакет moment для работы с датой и временем
/* const now = moment(); */
/* import moment from 'moment'; */
/* const moment = require('moment'); */
/* moment.locale('ru');
const now = moment(); */
/* import statsModule from './StatsComp' */

/* Корзина с товарами */
Vue.component('basket', {
    data() {
        return {
            basket: {
                'amount': 0,
                'countGoods': 0,
                'contents': {}
            },
            getBasketURL: '/getBasket.json',
            addBasketURL: '/addToBasket.json',
            delBasketURL: '/deleteFromBasket.json',
            isVisibleCart: false,
            plugBasket: 'В корзине нет товаров',
            plug: false,
        }
    },
    methods: {
        addToBasket(product) {
            /* Если товар уже есть в корзине */
            if (Object.keys(this.basket.contents).includes(String(product.id_product))) {
                this.$parent.putJson('/api/cart', { product: product, action: "add" })
                    .then(data => {
                        if (data.result === 1) {
                            this.basket.contents[product.id_product].quantity++;
                            this.updateBasket();
                            /* this.$root.eventHub.$emit('statsEvent', 'hsdfjsdhfgsjdfsjdf'); */
                        }
                    })
                    .catch(data => {
                        console.log(data.error);
                    });
            } else {
                this.$parent.postJson('/api/cart', { product: product, action: "add" })
                    .then(data => {
                        if (data.result === 1) {
                            this.basket.contents[product.id_product] = JSON.parse(JSON.stringify(product));
                            this.basket.contents[product.id_product].quantity = 1;
                            this.updateBasket();
                            this.plugVisible();
                            /* this.$root.eventHub.$emit('statsEvent', JSON.stringify({ action: "add", id_product: product.id_product })); */
                            /* this.$root.eventHub.$emit('statsEvent', 'hsdfjsdhfgsjdfsjdf'); */
                        }
                    })
                    .catch(data => {
                        console.log(data.error);
                    });
            }
        },
        delFromBasket(product) {
            if (this.basket.contents[product.id_product].quantity === 1) {
                this.$parent.postJson('/api/cart', { product: product, action: "del" })
                    .then(data => {
                        delete this.basket.contents[product.id_product];
                        this.updateBasket();
                        this.plugVisible();
                        /* this.$root.eventHub.$emit('statsEvent', 'hsdfjsdhfgsjdfsjdf'); */
                    })
                    .catch(error => {
                        this.$root.eventHub.$emit('errorConnectServer', error);
                        console.log(error);
                    });
            } else {
                this.$parent.putJson('/api/cart', { product: product, action: "del" })
                    .then(data => {
                        if (data.result === 1) {
                            this.basket.contents[product.id_product].quantity--;
                            this.updateBasket();
                            /* this.$root.eventHub.$emit('statsEvent', 'hsdfjsdhfgsjdfsjdf'); */
                        }
                    })
                    .catch(error => {
                        this.$root.eventHub.$emit('errorConnectServer', error);
                        console.log(error);
                    });
            }







            /* this.$parent.putJson('/api/cart', { id: product.id_product, action: "del" })
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
            } */



            /*             this.$parent.getJson(`${API + this.delBasketURL}`)
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
                            .catch(error => {
                                this.$root.eventHub.$emit('errorConnectServer', error);
                                console.log(error);
                            }); */
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
        visibilityBasket() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        plugVisible() {
            if (Object.keys(this.basket.contents).length === 0) {
                this.plug = false;
            } else {
                this.plug = true;
            }
        },
    },
    mounted() {
        /* this.$set(this.basket, 'amount', 0);
        this.$set(this.basket, 'countGoods', 0);
        this.$set(this.basket, 'contents', {}); */

        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of Object.values(data.contents)) {
                    this.basket.contents[el.id_product] = el;
                }
                this.basket.amount = data.amount;
                this.basket.countGoods = data.countGoods;
                this.plugVisible();
            })
            .catch(error => {
                this.$emit('errorConnectServer', error);
                console.log(error);
            });

        const self = this;
        this.$root.eventHub.$on('visibleBasket', function () {
            self.visibilityBasket();
        });
        this.$root.eventHub.$on('addToBasket', function (product) {
            self.addToBasket(product);
        });
    },
    template: `
                <section class="basket content-container">
                    <article class="basket-items basket-content"
                        :class="{ visible: isVisibleCart, unvisible: !isVisibleCart }">
                        <h4 class="basket-header basket-grid">
                            <span class="basket-delimiter basket-text">--- Наименование ---</span>
                            <span class="basket-delimiter basket-text">Цена</span>
                            <span class="basket-delimiter basket-text">Кол-во</span>
                            <span class="basket-delimiter basket-text">ИТОГО:</span>
                        </h4>
                        <div class="plug-basket" :class="{ block: !plug, none: plug }">
                            <h4 class="plug-text">{{ plugBasket }}</h4>
                        </div>

                            <basketItem class="item-basket basket-grid" v-for="item of Object.values(basket.contents)"
                                :key="item.id_product"
                                :basketItem="item"
                                @visibilityBasket="visibilityBasket"
                                @addToBasket="addToBasket"
                                @delFromBasket="delFromBasket">
                            </basketItem>
                        
                        <div class="basket-footer basket-grid">
                            <span class="basket-delimiter basket-text">ОБЩИЙ ИТОГ:</span>
                            <span class="basket-delimiter basket-text"></span>
                            <span class="basket-delimiter basket-text" data-footer-basket="count">{{
                                basket.countGoods }}</span>
                            <span class="basket-delimiter basket-text" data-footer-basket="summa">{{ basket.amount
                                }} руб.</span>
                        </div>
                    </article>
                </section>
    `
});

/* Элемент корзины */
Vue.component('basketItem', {
    props: ['basketItem'],
    template: ` <div class="basket-elements">
                    <div class="basket-item-name basket-delimiter basket-text-italic" data-item="name">
                        <button class="btn-item-basket-inc" @click="$emit('addToBasket', basketItem)">
                         +
                        </button>
                        {{ basketItem.product_name }}
                        <button class="btn-item-basket-dec" @click="$emit('delFromBasket', basketItem)">
                         - 
                        </button>
                    </div>
                    <span class="basket-delimiter basket-text-italic" data-item="price">{{ basketItem.price }}
                        руб.</span>
                    <span class="basket-delimiter basket-text-italic" data-item="count">{{ basketItem.quantity }}</span>
                    <span class="basket-delimiter basket-text-italic" data-item="summa">{{ basketItem.price * basketItem. quantity }} руб.</span>
                </div>
    `
});