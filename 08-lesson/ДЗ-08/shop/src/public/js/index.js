// import '@babel/polyfill'
import appMain from './main.js';
/* import './css/normalize.css' assert { type: 'css' };
import './css/style.css' assert { type: 'css' }; */
/* import "./css/normalize.css";
import "./css/style.css"; */
// import './css/style.sass'

/* import normalize from './css/normalize.css' assert { type: "css" };
import style from './css/style.css' assert { type: "css" };
document.adoptedStyleSheets = [normalize, style]; */

/* Vue.prototype.$eventBus = new Vue(appMain).$mount('#app'); */
/* const eventBus = new Vue(); */

const app = new Vue(appMain).$mount('#app');
