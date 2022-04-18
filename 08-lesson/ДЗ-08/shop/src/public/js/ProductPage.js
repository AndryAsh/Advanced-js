const product_page = {
    data() {
        return {
            product: this.$route.params.product
        }
    },
    template: `
    <!-- <p>{{ product }}</p> -->
    <!-- <div>{{ typeof(this.$route.params.product) }}</div> -->
    <article class="product-item border-radius content-container">
        <div class="product-img-wrap border-radius">
            <img src="../img/no_image-1200x630.png" alt="Фотография товара" class="product-img border-radius">
            </div>
                <h3 class="product-header">{{ product.product_name }}</h3>
                <span class="product-price">Цена: {{ product.price }} руб.</span>
                <div class="center">
                    <button class="basket-control-btn" type="button" @click="$root.eventBus.$emit('addToCart',
                        product)">Добавить в корзину</button>
                </div>
    </article>
    `
};

export default product_page;