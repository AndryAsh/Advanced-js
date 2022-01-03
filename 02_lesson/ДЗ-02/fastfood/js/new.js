'use strict';

// Базовый родительский класс списка
class ObjList {
    container;
    products;
    productObjects;

    constructor(container) {
        this.container = container;
        this.products = [];
        this.productObjects = [];
    }

    searchObj(id) {
        return this.productObjects.find(obj => obj.id === id);
    }

    /* searchObj = (id) => {
        return this.productObjects.find(obj => obj.id === id);
    } */
}

// Базовый родительский класс экземпляра
class ProductItem {
    constructor(product) {
        this.name = product.name;
        this.price = product.price;
        this.calories = product.calories;
        this.id = product.id;
        this.img = product.img ?? './img/no_image-1200x630.png';
    }
}

// Класс списка гамбургеров, производный от ObjList
class BurgerItem extends ProductItem {
    getHTMLString() {
        return `<article class="product-item border-radius">
                    <h3 class="product-header">${this.name}</h3>
                    <div class="product-wrap border-radius">
                        <div class="product-img-wrap border-circle">
                            <img src=${this.img} alt="Фото товара" class="product-img border-circle">
                            <button class="product-btn" type="button" data-id=${this.id}>В корзину</button>
                        </div>
                    </div>
                    <span class="product-price">${this.price}</span>
                </article>`
    }
}

// Класс экземпляра гамбургера, производный от ProductItem
class BurgerList extends ObjList {

    constructor(container = '.products') {
        super(container);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.products = [
            { id: '1b', name: 'большой гамбургер', price: 100, calories: 40, img: 'img/big-burger.jpg' },
            { id: '2b', name: 'маленький гамбургер', price: 50, calories: 20, img: 'img/little-burger.jpg' },
        ];
    }

    _render() {
        const target = document.querySelector(this.container);

        this.products.forEach(product => {
            const productObject = new BurgerItem(product);
            this.productObjects.push(productObject);

            target.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        });
        this.products = [];
    }
}

// Класс экземпляра начинки, производный от ProductItem
class FillingItem extends ProductItem {
    getHTMLString() {
        return `<label class="filling">
                    <input class="options-check" type="radio" name="filling" data-id=${this.id}>
                    <img src=${this.img} alt="Фото начинки" class="filling-img">
                    <span class="filling-name">${this.name}</span>
                </label>`
    }
}

// Класс списка начинок, производный от ObjList
class FillingList extends ObjList {
    constructor(container = '.filling-list') {
        super(container);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.products = [
            { id: '1f', name: 'сыр', price: 10, calories: 20, img: 'img/cheese.jpg' },
            { id: '2f', name: 'салат', price: 20, calories: 5, img: 'img/salat.jpg' },
            { id: '3f', name: 'картофель', price: 15, calories: 10, img: 'img/potato.jpg' },
        ];
    }

    _render() {
        const target = document.querySelector(this.container);

        this.products.forEach(product => {
            const productObject = new FillingItem(product);
            this.productObjects.push(productObject);

            target.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        });
        this.products = [];
    }
}

// Класс экземпляра дополнения, производный от ProductItem
class AdditionItem extends ProductItem {
    getHTMLString() {
        return `<label class="addition">
                    <input class="options-check" type="checkbox" name="addition" data-id=${this.id}>
                    <img src=${this.img} alt="Фото начинки" class="addition-img">
                    <span class="addition-name">${this.name}</span>
                </label>`
    }
}

// Класс списка дополнений, производный от ObjList
class AdditionList extends ObjList {
    constructor(container = '.addition-list') {
        super(container);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.products = [
            { id: '1a', name: 'приправа', price: 15, calories: 0, img: 'img/condiments.jpg' },
            { id: '2a', name: 'майонез', price: 20, calories: 5, img: 'img/mayonese.jpg' },
        ];
    }

    _render() {
        const target = document.querySelector(this.container);

        this.products.forEach(product => {
            const productObject = new AdditionItem(product);
            this.productObjects.push(productObject);

            target.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        });
        this.products = [];
    }
}

// Корзина товаров
class BasketList {
    container;
    items;

    constructor(container = '.basket-elements') {
        this.container = container;
        this.items = [];
    }

    // Добавить позицию в корзину
    addItem(item) {
        let itemBasket = this._searchById(item.id)
        if (itemBasket) {
            itemBasket._incCount();
            itemBasket._update(this.container);
        } else {
            this.items.push(item);
            item._render(this.container);
        }

        // Обновляем итоговые значения корзины
        this._update();

    }

    // Поиск элемента по его id
    _searchById(id) {
        return this.items.find(element => element.id === id);
    }

    // Удалить позицию из корзины
    delItem(item) {

    }

    // Очистка всей корзины
    clear() {
        this.items = [];
    }

    // Изменение итоговых данных корзины
    _update() {
        let prices = [], calories = [], containerElement = '.basket-footer';
        this.items.forEach(element => {
            prices.push(element.getPrices().reduce(function (sum, elem) { return sum + elem; }, 0) * element.count);
            calories.push(element.getCalories().reduce(function (sum, elem) { return sum + elem; }, 0) * element.count);
        });

        document.querySelector(containerElement + ' > ' + 'span[data-footer-basket="calories"]').innerText = calories.reduce(function (sum, elem) { return sum + elem; }, 0);

        document.querySelector(containerElement + ' > ' + 'span[data-footer-basket="summa"]').innerText = prices.reduce(function (sum, elem) { return sum + elem; }, 0) + ' руб.';
    }
}

// Класс элемента корзины
class itemBasket {
    id;
    collection;
    count;

    constructor(productList) {
        this.id = '';
        this.collection = [];
        this.count = 1;

        productList.forEach(product => {
            if (Array.isArray(product)) {
                product.forEach(element => {
                    this.id += element.id;
                    this.collection.push(element);
                });
            } else {
                this.id += product.id;
                this.collection.push(product);
            }
        });
    }

    // Увеличить счетчик количества
    _incCount() {
        this.count++;
    }

    // Уменьшить счетчик количества
    _decCount() {
        this.count--;
    }

    // Получить массив наименований элементов экземпляра
    getNames() {
        let names = [];
        this.collection.forEach(element => {
            names.push(element.name)
        });
        return names;
    }

    // Получить массив цен элементов экземпляра
    getPrices() {
        let prices = [];
        this.collection.forEach(element => {
            prices.push(element.price)
        });
        return prices;
    }

    // Получить массив калорий элементов экземпляра
    getCalories() {
        let calories = [];
        this.collection.forEach(element => {
            calories.push(element.calories)
        });
        return calories;
    }

    _render(container) {
        const target = document.querySelector(container);

        target.insertAdjacentHTML('beforeend', this._getHTMLString());
    }

    _getHTMLString() {
        let stringHTML = '', calories = [], price = [];

        this.collection.forEach(element => {
            stringHTML += `<div class="item-basket basket-grid" data-id=${this.id}>
                                <span class="basket-delimiter basket-text-italic" data-item="name">${element.name}</span>
                                <span class="basket-delimiter basket-text-italic" data-item="calories">${element.calories}</span>
                                <span class="basket-delimiter basket-text-italic" data-item="price">${element.price} руб.</span>
                                <span class="basket-delimiter basket-text-italic" data-item="count">${this.count}</span>
                            </div>`
            calories.push(element.calories);
            price.push(element.price);
        });

        stringHTML += `<div class="footer-item-basket basket-grid" data-id=${this.id}>
                            <span class="basket-delimiter basket-text-italic">ИТОГ по позиции:</span>
                            <span class="basket-delimiter basket-text-italic" data-info="allcalories">${calories.reduce(function (sum, elem) { return sum + elem; }, 0)}</span>
                            <span class="basket-delimiter basket-text-italic" data-info="summa">${price.reduce(function (sum, elem) { return sum + elem; }, 0)} руб.</span>
                            <span class="basket-delimiter basket-text-italic"></span>
                        </div>`;
        return stringHTML;
    }

    // Изменить значения итоговой суммы, количества и суммы калорий позиции
    _update(container) {
        let target = document.querySelectorAll(container + ' > ' + `div[data-id="${this.id}"]` + ' > ' + 'span[data-item="count"]');
        target.forEach(element => {
            element.innerText = this.count;
        });

        target = document.querySelector(container + ' > ' + `div[data-id="${this.id}"]` + ' > ' + 'span[data-info="allcalories"]');
        target.innerText = this.getCalories().reduce(function (sum, elem) { return sum + elem; }, 0) * this.count;

        target = document.querySelector(container + ' > ' + `div[data-id="${this.id}"]` + ' > ' + 'span[data-info="summa"]');
        target.innerText = this.getPrices().reduce(function (sum, elem) { return sum + elem; }, 0) * this.count + ' руб.';
    }

}

// Класс управления данными на странице
class DataList {
    burger;
    filling;
    addition;

    constructor() {
        this.burger = new BurgerList();
        this.filling = new FillingList();
        this.addition = new AdditionList();

        this._setDefaultProperty();

        this._addEventObjectSelection(this.burger.container);


    }

    _setDefaultProperty() {
        const checkElements = document.querySelectorAll('.options-check');
        checkElements.forEach(element => {
            if (element.dataset.id === '1f') {
                element.checked = true;
            } else {
                element.checked = false;
            }
        });
    }

    // Привязываем событие клика мыши к списку товаров (.products)
    _addEventObjectSelection(container) {
        document.querySelector(container).addEventListener('click', function (event) {
            let burger, filling, addition = [];

            if (event.target.className === 'product-btn') {
                burger = data.burger.searchObj(event.target.dataset.id);

                data._allCheckElement().forEach(element => {
                    if (element.slice(-1) === 'f') {
                        filling = data.filling.searchObj(element)
                    } else if (element.slice(-1) === 'a') {
                        addition.push(data.addition.searchObj(element));
                    }
                });

                basket.addItem(new itemBasket([burger, filling, addition]));

                data._setDefaultProperty();
            }
        });
    }

    _allCheckElement() {
        let checkArrray = [];

        document.querySelectorAll('.options-check').forEach(element => {
            if (element.checked) {
                checkArrray.push(element.dataset.id);
            }
        });

        return checkArrray;
    }
}

const data = new DataList();
const basket = new BasketList();


