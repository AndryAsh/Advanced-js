/* Поиск товара */
Vue.component('search-product', {
    data() {
        return {
            searchLine: '',
            searchVisible: true,
        }
    },
    methods: {
        searchClick() {
            this.$root.eventHub.$emit('searchProduct', this.searchLine);
        },
        buttonBasketClick() {
            this.$root.eventHub.$emit('visibleBasket');
        },
    },
    template: `
    <div class="basket">
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine">
        <button class="btn-search" type="button" @click="searchClick()">
            <i class="fas fa-search"></i>
        </button>
    </form>
    <button class="basket-btn" type="button"
        @click="buttonBasketClick()">Корзина</button>
</div>
    `
});
