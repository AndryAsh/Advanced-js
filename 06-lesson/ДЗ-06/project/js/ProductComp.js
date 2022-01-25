/* Каталог товаров */
Vue.component('products', {
    data() {
        return {
            catalogURL: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: './img/no_image-1200x630.png',
        }
    },
    methods: {
        FilterGoods(line) {
            let regexp = new RegExp(line, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.searchVisible = false;
        },
    },
    mounted() {
        const self = this;
        this.$root.eventHub.$on('searchProduct', function (data) {
            self.FilterGoods(data);
        });
        this.$parent.getJson(`${API + this.catalogURL}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.filtered = JSON.parse(JSON.stringify(this.products));
            })
            .catch(error => {
                this.$root.eventHub.$emit('errorConnectServer', error);
                console.log(error);
            });
    },
    template: `
                <section class="products content-container">
                    <product v-for="product of filtered"
                             :key="product.id_product"
                             :img="imgCatalog"
                             :product="product">
                    </product>
                </section>
    `
});

/* Товар */
Vue.component('product', {
    props: ['product', 'img'],
    template: `
                <article class="product-item border-radius" :data-id="product.id_product">
                    <div class="product-img-wrap border-radius">
                        <img :src="img" alt="Фотография товара" class="product-img border-radius">
                        <button class="product-btn" type="button" @click="$root.eventHub.$emit('addToBasket', product)">
                        Добавить в корзину
                        </button>
                    </div>
                        <h3 class="product-header">{{ product.product_name }}</h3>
                        <span class="product-price">Цена: {{ product.price }} руб.</span>
                    </article>
    `
});
