/* import products from './ProductsComp.js' */

const search = {
    data() {
        return {
            userSearch: '',
            productsAPI: this.$parent.$root.$refs.products,
            /* productsAPI.filter(userSearch) */
        }
    },
    template: `
    <div class="basket">
    <form action="#" class="search-form" @submit.prevent="$root.eventBus.$emit('searchProduct', userSearch)">
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    </div>
    `
};

export default search;
