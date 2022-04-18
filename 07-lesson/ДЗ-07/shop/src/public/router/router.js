import products from '../js/ProductsComp.js'
import product_page from '../js/ProductPage.js'
import cart_page from '../js/CartPage.js'
import home from '../js/HomePage.js'
/* import page_header from '../js/HeaderPage.js' */

const routes = [
    { path: '/', name: 'home', component: home },
    { path: '/products', name: 'products', component: products, props: true },
    { path: '/product/:id', name: 'product_page', component: product_page, props: true },
    { path: '/cart', name: 'cart_page', component: cart_page, props: true },
]

const router = new VueRouter({
    routes,
});

export default router;