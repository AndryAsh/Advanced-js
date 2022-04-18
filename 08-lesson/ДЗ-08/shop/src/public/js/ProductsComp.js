/* import product_details from './ProductDetailsComp.js' */

const product = {
    /* components: { cart }, */
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            /* cartAPI: this.$root.$refs.cart, */ // добираемся до компонента корзины, чтобы далее использовать метод добавления
            /* cartAPI: this.$parent.$root.$refs.page_header.$refs.cart, */
            /* cartAPI.addProduct(product) */
        };
    },
    methods: {
        routeAdd: function () {
            this.$router.push({ name: 'product_page', params: { id: this.product.id_product, product: this.product } });
        }
    },

    template: `
                <article class="product-item border-radius" :data-id="product.id_product">
                    <div class="product-img-wrap border-radius">
                        <img :src="img" alt="Фотография товара" class="product-img border-radius">
                        <button class="product-btn" type="button" @click="$root.eventBus.$emit('addToCart', product)">
                        Добавить в корзину
                        </button>
                    </div>
                        <h3 class="product-header">{{ product.product_name }}</h3>
                        <span class="product-price">Цена: {{ product.price }} руб.</span>
                        <!-- <router-link class="link-button" to="/products/:id_product">Карточка товара</router-link> -->
                        <button class="basket-control-btn" @click="routeAdd(product)" type="button">Карточка товара</button>
                </article>
    `
};

const products = {
    components: { product },
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: './img/no_image-1200x630.png',
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        const self = this;
        this.$root.eventBus.$on('searchProduct', (userSearch) => {
            self.filter(userSearch);
        });
    },
    template: `
                <section class="products content-container">
                    <product v-for="item of filtered"
                             :key="item.id_product"
                             :img="imgCatalog"
                             :product="item">
                    </product>
                </section>
    `
};

export default products;
