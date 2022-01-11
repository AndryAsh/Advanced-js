'use strict';

class ProductList {
  #container;       // Содержит имя HTML класса, в котором размещаются карточки товаров
  #goods;           // Содержит массив объектов, описывающих товары
  #productObjects;  // Содержит массив экземпляров класса ProductItem

  // Конструктор экземпляра класса.
  // Инициализирует свойства класса и добавляет товары на HTML страницу
  constructor(container = '.products') {
    this.#container = container;
    this.#goods = [];
    this.#productObjects = [];

    this._fetchGoodsData();
    this._render();
  }

  // Метод заполняет список объектов товаров
  // Имеет признак приватного метода класса
  _fetchGoodsData() {
    this.#goods = [
      { id: 1, title: 'Notebook', price: 1000, img: './img/notebook-1200x630.webp' },
      { id: 2, title: 'Mouse', price: 100, img: './img/mouse-1200x630.webp' },
      { id: 3, title: 'Keyboard', price: 250, img: null },
      { id: 4, title: 'Gamepad', price: 150, img: null },
    ];
  }

  // Метод, определяющий суммарную стоимость всех товаров
  _getTotalCost() {
    let totalCost = 0;

    this.#goods.forEach(element => {
      totalCost += element.price;
    });

    return totalCost;
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
}

// Класс описывает экземпляр товара со свойствами объекта из списка ProductList.#goods
// Если свойство img равно null, подставляется значение по-умолчанию
class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img ?? './img/no_image-1200x630.png';
  }

  // Создание HTML карточки товара
  getHTMLString() {
    return `<article class="product-item border-radius" data-id=${this.id}>
              <div class="product-img-wrap border-radius">
                <img src=${this.img} alt="Фотография товара" class="product-img border-radius">
                <button class="product-btn" type="button">Добавить в корзину</button>
              </div>
              <h3 class="product-header">${this.title}</h3>
              <span class="product-price">Цена: ${this.price}</span>
            </article>`;
  }
}

// Класс корзины с выбранными товарами
class ProductBasket {
  #productList;          // Список товаров в корзине

  constructor() {
    this.#productList = [];
  }

  addToBasket(productId) {
    // Добавить товар в корзину
  }

  removeFromBasket(productId) {
    // Удалить товар из корзины
  }

  summa() {
    // Расчет общей стоимости корзины
  }
}

// Класс элементов корзины
class BasketItem {
  #id;
  #count;

  constructor(productId) {
    this.#id = id;
    this.#count = 1;
  }

  setCount(productId) {
    // Изменить значение счетчика товара в корзине
  }

  getSum(productId) {
    // Рассчитать сумму конкретного товара в корзине с учетом количества и возможных скидок
  }
}
/*
Думаю, что нет смысла дублировать информацию экземпляров класса ProductItem.
Достаточно создать экземпляр класса BasketItem, содержащий id и счетчик товара count,
все остальные данные по свойствам конкретного товара можно получить.
*/

const catalog = new ProductList();
const basket = new ProductBasket();