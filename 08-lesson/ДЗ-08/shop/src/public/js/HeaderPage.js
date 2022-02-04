import search from './FilterComp.js'
import cart from './CartComp.js'

const page_header = {
    components: {
        search,
        cart,
    },
    template: `
                <header class="page-header">
                    <router-link class="logo" to="/">Интернет-магазин</router-link>
                    <router-link class="logo" to="/products">Каталог товаров</router-link>
                    <div class="page-header-action">
                        <search ref="search"></search>
                        <cart ref="cart"></cart>
                    </div>
                </header>
    `
}

export default page_header;