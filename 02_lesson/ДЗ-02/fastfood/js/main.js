'use strict';

class ProductList {
    #containerBurger;       // Содержит имя HTML класса, в котором размещаются карточки гамбургеров
    #containerFilling;      // Содержит имя HTML класса, в котором размещаются начинки
    #containerAddition;     // Содержит имя HTML класса, в котором размещаются дополнения
    #burgers;               // Содержит массив объектов, описывающих гамбургеры
    #fillings;              // Содержит массив объектов, описывающих начинки
    #additions;             // Содержит массив объектов, описывающих дополнения

    constructor(containerBurger = '.products',
        containerFilling = '.filling-list',
        containerAddition = '.addition-list') {

        this.#containerBurger = containerBurger;
        this.#containerFilling = containerFilling;
        this.#containerAddition = containerAddition;
        this.#burgers = [];
        this.#fillings = [];
        this.#additions = [];
        /* this.burgerObjects = []; */

        this._fetchData();
        this._render(this.#fillings, this.#containerFilling);
        this._render(this.#additions, this.#containerAddition);
        this._render(this.#burgers, this.#containerBurger);

        this._setDefaultProperty();
    }

    _fetchData() {
        this.#burgers = [
            { id: '1b', name: 'большой гамбургер', price: 100, calories: 40, img: 'img/big-burger.jpg' },
            { id: '2b', name: 'маленький гамбургер', price: 50, calories: 20, img: 'img/little-burger.jpg' },
        ];

        this.#fillings = [
            { id: '1f', name: 'сыр', price: 10, calories: 20, img: 'img/cheese.jpg' },
            { id: '2f', name: 'салат', price: 20, calories: 5, img: 'img/salat.jpg' },
            { id: '3f', name: 'картофель', price: 15, calories: 10, img: 'img/potato.jpg' },
        ];

        this.#additions = [
            { id: '1a', name: 'приправа', price: 15, calories: 0, img: 'img/condiments.jpg' },
            { id: '2ф', name: 'майонез', price: 20, calories: 5, img: 'img/mayonese.jpg' },
        ];
    }

    _getBurgerHTML(burger) {
        return `<article class="product-item border-radius">
                    <h3 class="product-header">${burger.name}</h3>
                    <div class="product-wrap border-radius">
                        <div class="product-img-wrap border-circle">
                            <img src=${burger.img} alt="Фото товара" class="product-img border-circle">
                            <button class="product-btn" type="button" data-id=${burger.id}>В корзину</button>
                        </div>
                    </div>
                    <span class="product-price">${burger.price}</span>
                </article>`
    }

    _getFillingHTML(filling) {
        return `<label class="filling">
                    <input class="options-check" type="radio" name="filling" data-id=${filling.id}>
                    <img src=${filling.img} alt="Фото начинки" class="filling-img">
                    <span class="filling-name">${filling.name}</span>
                </label>`
    }

    _getAdditionHTML(addition) {
        return `<label class="addition">
                    <input class="options-check" type="checkbox" name="addition" data-id=${addition.id}>
                    <img src=${addition.img} alt="Фото начинки" class="addition-img">
                    <span class="addition-name">${addition.name}</span>
                </label>`
    }

    _render(arr, container) {
        let target;

        if (container === this.#containerBurger) {
            target = document.querySelector(container);
            arr.forEach(burger => {
                target.insertAdjacentHTML('beforeend', this._getBurgerHTML(burger));
            });
        }

        if (container === this.#containerFilling) {
            target = document.querySelector(container);
            arr.forEach(filling => {
                target.insertAdjacentHTML('beforeend', this._getFillingHTML(filling));
            });
        }

        if (container === this.#containerAddition) {
            target = document.querySelector(container);
            arr.forEach(addition => {
                target.insertAdjacentHTML('beforeend', this._getAdditionHTML(addition));
            });
        }
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
}

const products = new ProductList();