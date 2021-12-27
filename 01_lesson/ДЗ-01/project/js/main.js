const products = [
  { id: 1, title: 'Notebook', price: 1000, img: './img/notebook-1200x630.webp' },
  { id: 2, title: 'Mouse', price: 100, img: './img/mouse-1200x630.webp' },
  { id: 3, title: 'Keyboard', price: 250, img: '' },
  { id: 4, title: 'Gamepad', price: 150, img: '' },
];

const renderProduct = (title, price, img = '') => {
  if (img === '') {
    img = './img/no_image-1200x630.png';
  }
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
    target.insertAdjacentHTML('beforeend', (renderProduct(element.title, element.price, element.img)));
  });
};

renderCatalog(products);

/* 
Проблема с запятыми возникала из-за того, что в содержимое блока products вставлялся массив строк, запятые - это разделители элементов массива. При вставке весь массив вместе с разделителями был преобразован в текст.
Решается либо с применением метода join(' '), либо перебором элементов со вставкой.
insertAdjacentHTML работает быстрей чем innerHTML, кроме того, при большом количестве товаров размер массива будет огромный, что замедлит отрисовку страницы.
Сейчас каждый элемент рендерится и вставляется на страницу отдельно.
*/