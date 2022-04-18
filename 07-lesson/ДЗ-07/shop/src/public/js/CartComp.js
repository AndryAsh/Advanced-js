const cartItem = {
    props: ['cartItem', 'img'],
    template: `
    <div class="basket-elements">
    <div class="basket-item-name basket-delimiter basket-text-italic" data-item="name">
        <button class="btn-item-basket-inc" @click="$emit('addProduct', cartItem)">
         +
        </button>
        {{ cartItem.product_name }}
        <button class="btn-item-basket-dec" @click="$emit('remove', cartItem)">
         - 
        </button>
    </div>
    <span class="basket-delimiter basket-text-italic" data-item="price">{{ cartItem.price }}
        руб.</span>
    <span class="basket-delimiter basket-text-italic" data-item="count">{{ cartItem.quantity }}</span>
    <span class="basket-delimiter basket-text-italic" data-item="summa">{{ cartItem.price * cartItem.quantity }} руб.</span>
    </div>
    `
};

const cart = {
    components: { cartItem },
    data() {
        return {
            imgCart: './img/no_image-1200x630.png',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.$root.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.$root.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.$root.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
        goToCartPage() {
            this.showCart = !this.showCart;
            this.$router.push({ name: 'cart_page' });
        },
    },
    computed: {
        countGoods: function () {
            return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        },
        total: function () {
            return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
        },
    },
    mounted() {
        this.$parent.$root.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        const self = this;
        this.$root.eventBus.$on('addToCart', (product) => {
            self.addProduct(product);
        });
        this.$root.eventBus.$on('remFromCart', (product) => {
            self.remove(product);
        });
    },
    template: `
    <section class="basket">
    <button class="basket-btn" type="button"
        @click="showCart = !showCart">Корзина</button>
    <article class="basket-items basket-content border-radius" v-show="showCart">
        <h4 class="basket-header basket-grid">
            <span class="basket-delimiter basket-text">--- Наименование ---</span>
            <span class="basket-delimiter basket-text">Цена</span>
            <span class="basket-delimiter basket-text">Кол-во</span>
            <span class="basket-delimiter basket-text">ИТОГО:</span>
        </h4>
        <div class="plug-basket" v-if="!cartItems.length">
            <h4 class="plug-text">Корзина пуста</h4>
        </div>

            <cartItem class="item-basket basket-grid" v-for="item of cartItems"
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove"
                @addProduct="addProduct">
            </cartItem>
        
        <div class="basket-footer basket-grid">
            <span class="basket-delimiter basket-text">ОБЩИЙ ИТОГ:</span>
            <span class="basket-delimiter basket-text"></span>
            <span class="basket-delimiter basket-text" data-footer-basket="count">{{ countGoods }}</span>
            <span class="basket-delimiter basket-text" data-footer-basket="summa">{{ total }} руб.</span>
        </div>
        <div class="basket-control">
            <button class="basket-control-btn" @click="goToCartPage()">Перейти в корзину</button>
            <!-- <router-link class="link-button" to="/cart" @router-link-active="showCart = !showCart">Перейти в корзину</router-link> -->
            <button class="basket-control-btn" type="button" @click="showCart = !showCart">Закрыть</button>
        </div>
    </article>
    </section>
`
};

export default cart;
