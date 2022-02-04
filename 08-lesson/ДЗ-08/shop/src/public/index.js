// import '@babel/polyfill'
import appMain from './js/main.js'
/* import './css/normalize.css'
import './css/style.css' */
// import './css/style.sass'

/* Vue.prototype.$eventBus = new Vue(appMain).$mount('#app'); */
/* const eventBus = new Vue(); */

const app = new Vue(appMain).$mount('#app');
