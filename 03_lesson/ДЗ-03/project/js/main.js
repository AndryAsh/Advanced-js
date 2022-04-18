'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/* function getRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr;

    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.statusText);
        } else {
          resolve(xhr.response)
        }
      }
    }
    xhr.send();
  });
}

getRequest(`${API}/catalogData.json`)
  .then(products => {
    console.log(JSON.parse(products));
  }).catch(error => {
    console.log(error);
  }); */

class ProductList {
  #container;       // Содержит имя HTML класса, в котором размещаются карточки товаров
  #goods;           // Содержит массив объектов, описывающих товары
  #productObjects;  // Содержит массив экземпляров класса ProductItem
  basket;          // Ссылка на объект корзины

  // Конструктор экземпляра класса.
  // Инициализирует свойства класса и добавляет товары на HTML страницу
  constructor(basket, container = '.products') {
    this.basket = basket;
    this.#container = container;
    this.#goods = [];
    this.#productObjects = [];

    this._getProducts().then(data => {
      this.#goods = data;
      this._render();

      document.querySelector('.products').addEventListener('click', function (event) {
        if (event.target.className === 'product-btn') {
          catalog.basket.addToBasket(catalog._searchById(Number(event.target.dataset.id)));
        }
      });

      document.querySelector('.basket-elements').addEventListener('click', function (event) {
        if (event.target.className === 'btn-item-basket-inc') {
          catalog.basket.addToBasket(catalog.basket._searchById(Number(event.target.dataset.id)));
        }

        if (event.target.className === 'btn-item-basket-dec') {
          catalog.basket.delFromBasket(catalog.basket._searchById(Number(event.target.dataset.id)));
        }
      })
    });
  }

  // Получить список товаров с сервера
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  // Метод создает экземппляры объектов товаров, используя свойства объектов массива #goods
  // и наполняет элемент HTML страницы, имеющий HTML класс, сохраненный в свойстве #container, товарами
  _render() {
    const target = document.querySelector(this.#container);

    this.#goods.forEach(product => {
      const productObject = new ProductItem(product);
      this.#productObjects.push(productObject);

      target.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    });
  }

  // Подсчет общей стоимости товаров.
  _sum(list) {
    return list.reduce((sum, { price }) => sum + price, 0);
  }

  _searchById(id) {
    return this.#productObjects.find(element => element.id_product === id);
  }
}

// Класс описывает экземпляр товара со свойствами объекта из списка ProductList.#goods
// Если свойство img равно null, подставляется значение по-умолчанию
class ProductItem {
  constructor(product) {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = product.img ?? './img/no_image-1200x630.png';
  }

  // Создание HTML карточки товара
  getHTMLString() {
    return `<article class="product-item border-radius" data-id=${this.id_product}>
              <div class="product-img-wrap border-radius">
                <img src=${this.img} alt="Фотография товара" class="product-img border-radius">
                <button class="product-btn" type="button" data-id=${this.id_product}>Добавить в корзину</button>
              </div>
              <h3 class="product-header">${this.product_name}</h3>
              <span class="product-price">Цена: ${this.price}</span>
            </article>`;
  }
}

// Класс корзины с выбранными товарами
class ProductBasket {
  container;             // Класс HTML для рендера корзины
  amount;                // Общая стоимость товаров в корзине
  countGoods;            // Количество товаров в корзине
  contents;              // Список товаров в корзине

  constructor(container = '.basket-elements') {
    this.container = container;
    this.amount = 0;
    this.countGoods = 0;
    this.contents = [];

    // Получаем корзину с сервера
    this._getBasket().then(data => {
      this.contents = data.contents;
      this.amount = data.amount;
      this.countGoods = data.countGoods;

      this.contents.forEach(item => {
        this._render(item);
      })

      this.setCountToHTML();
      this.setSummaToHTML();
    });
  }

  // Запрос корзины с сервера
  _getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  _sendToServer(target = 'addToBasket.json') {
    return fetch(`${API}/${target}`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  _searchById(id) {
    return this.contents.find(element => element.id_product === id);
    /* return this.contents.find(element => element.id_product === id); */
  }

  // Добавить товар в корзину
  addToBasket(product) {
    let itemBasket;
    const item = JSON.parse(JSON.stringify(product, ['product_name', 'price', 'id_product']));

    // Проверка наличия товара в корзине
    if (!(itemBasket = this._searchById(item.id_product))) {
      item.quantity = 1;
      this._sendToServer().then(data => {
        if (data.result === 1) {
          this.contents.push(item);
          this.countGoods++;
          this._render(item);
          this.summa();
          this.setCountToHTML();
          this.setSummaToHTML();
        }
      });
    } else {
      this._sendToServer().then(data => {
        if (data.result === 1) {
          itemBasket.quantity++;
          this.setQuantityToHTML(itemBasket);
          this.setItemSummaToHTML(itemBasket);
          this.summa();
          this.setCountToHTML();
          this.setSummaToHTML();
        }
      });
    }
  }

  // Удалить товар из корзины
  delFromBasket(product) {
    product.quantity--;

    if (product.quantity === 0) {
      this._sendToServer('deleteFromBasket.json').then(data => {
        if (data.result === 1) {
          this.contents.splice(this.contents.indexOf(product), 1);
          this.removeFromHTML(product.id_product);
          this.countGoods--;
          this.summa();
          this.setCountToHTML();
          this.setSummaToHTML();
        }
      });
    } else {
      this._sendToServer('deleteFromBasket.json').then(data => {
        if (data.result === 1) {
          this.setQuantityToHTML(product);
          this.setItemSummaToHTML(product);
          this.summa();
          this.setCountToHTML();
          this.setSummaToHTML();
        }
      });
    }
  }

  // Удалить товар из списка корзины на странице
  removeFromHTML(id) {
    document.querySelector(`.item-basket[data-id="${id}"]`).remove();
  }

  // Расчет общей стоимости корзины
  summa() {
    this.amount = this.contents.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  setSummaToHTML() {
    document.querySelector('.basket-text[data-footer-basket="summa"]').innerText = this.amount + ' руб.';
  }

  setCountToHTML() {
    document.querySelector('.basket-text[data-footer-basket="count"]').innerText = this.countGoods;
  }

  setQuantityToHTML(item) {
    document.querySelector(`.item-basket[data-id="${item.id_product}"] > .basket-text-italic[data-item="count"]`).innerText = item.quantity;
  }

  setItemSummaToHTML(item) {
    document.querySelector(`.item-basket[data-id="${item.id_product}"] > .basket-text-italic[data-item="summa"]`).innerText = item.quantity * item.price;
  }

  getHTMLString(item) {
    return `<div class="item-basket basket-grid" data-id=${item.id_product}>
              <div class="basket-item-name basket-delimiter basket-text-italic" data-item="name">
                <button class="btn-item-basket-inc" data-id=${item.id_product}> + </button>
                ${item.product_name}
                <button class="btn-item-basket-dec" data-id=${item.id_product}> - </button>
              </div>
              <span class="basket-delimiter basket-text-italic" data-item="price">${item.price} руб.</span>
              <span class="basket-delimiter basket-text-italic" data-item="count">${item.quantity}</span>
              <span class="basket-delimiter basket-text-italic" data-item="summa">${item.price * item.quantity} руб.</span>
            </div>`;
  }

  _render(item) {
    const target = document.querySelector(this.container);
    target.insertAdjacentHTML('beforeend', this.getHTMLString(item));
  }
}

const basket = new ProductBasket();
const catalog = new ProductList(basket);
