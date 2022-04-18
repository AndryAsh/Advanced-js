const cartItem = {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-elements">
        <img src="../img/no_image-1200x630.png" alt="Фотография товара" class="cart-img border-radius">
        <span class="cart-text">{{ cartItem.product_name }}</span>
        <span class="cart-text">Цена: {{ cartItem.price }}</span>
        <span class="cart-text span-flex">
            <button class="btn-item-cart" @click="$root.eventBus.$emit('addToCart', cartItem)"> + </button>
            Кол-во: {{ cartItem.quantity }}
            <button class="btn-item-cart" @click="$root.eventBus.$emit('remFromCart', cartItem)"> - </button>
        </span>
        <span class="cart-text">Сумма: {{ cartItem.price * cartItem.quantity }}</span>
    </div>
    `
};

const cart_page = {
    components: { cartItem },
    data() {
        return {
            imgCart: '',
            cartItems: [],
        }
    },
    computed: {
        countGoods: function () {
            this.cartItems = this.$root.$refs.page_header.$refs.cart.cartItems;
            return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        },
        total: function () {
            return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        },
    },
    template: `
                <!-- <div>cartItems: {{ cartItems }}</div> -->
                <!-- <div>{{ this.$route.params }}</div> -->
        <section class="cart content-container">
            <cartItem class="item-basket cart-grid" v-for="item of cartItems"
                :key="item.id_product"
                :cart-item="item">
            </cartItem>
            <div class="cart-footer">
                <span class="cart-text-footer">Количество: {{ countGoods }}</span>
                <span class="cart-text-footer">Общая сумма: {{ total }}</span>
            </div>
        </section>
    `
};
export default cart_page;

/* 
{ "cart": [ { "quantity": 1, "id_product": 457, "product_name": "Gamepad", "price": 3000 }, { "quantity": 1, "id_product": 124, "product_name": "Keyboard", "price": 1600 } ], "image": "./img/no_image-1200x630.png" }
*/