const products = [
  { id: 1, title: 'Notebook', price: 1000, img: './img/notebook-1200x630.webp' },
  { id: 2, title: 'Mouse', price: 100, img: './img/mouse-1200x630.webp' },
  { id: 3, title: 'Keyboard', price: 250, img: null },
  { id: 4, title: 'Gamepad', price: 150, img: null },
];

const renderProduct = (title, price, img = './img/no_image-1200x630.png') => {
  /* if (img === '') {
    img = './img/no_image-1200x630.png';
  } */
  console.log(img);
  return `<article class="product-item border-radius">
            <div class="product-img-wrap border-radius">
              <img src=${img} alt="Фотография товвара" class="product-img border-radius">
              <button class="product-btn" type="button">Добавить в корзину</button>
            </div>
            <h3 class="product-header">${title}</h3>
            <span class="product-price">Цена: ${price}</span>
          </article>`;
};

const renderCatalog = (list) => {
  const target = document.querySelector('.products');
  list.forEach(element => {
    /* target.insertAdjacentHTML('beforeend', (renderProduct(element.title, element.price, element.img))); */
    target.insertAdjacentHTML('beforeend', ((element.img) ? (renderProduct(element.title, element.price, element.img)) : (renderProduct(element.title, element.price))));
  });
};

renderCatalog(products);

/* 
Проблема с запятыми возникала из-за того, что в содержимое блока products вставлялся массив строк, запятые - это разделители элементов массива. При вставке весь массив вместе с разделителями был преобразован в текст.
Решается либо с применением метода join(' '), либо перебором элементов со вставкой.
insertAdjacentHTML работает быстрей чем innerHTML, кроме того, при большом количестве товаров размер массива будет огромный, что замедлит отрисовку страницы.
Сейчас каждый элемент рендерится и вставляется на страницу отдельно.
PS:
Изменил значение по-умолчанию в параметрах функции renderProduct, но условие все равно необходимо, т.к. в функцию при вызове передается значение ключа img и, если значение пустое - ничего не выводится.
Условие оптимизировал через тернарный оператор.
*/