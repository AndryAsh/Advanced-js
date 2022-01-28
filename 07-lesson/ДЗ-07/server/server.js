const fs = require('fs');               // Пакет fs для работы с файловой системой
const express = require('express');     // Пакет express - это http сервер
const moment = require('moment');       // Пакет moment для работы с датой и временем

moment.locale('ru');
const now = moment();

const app = express();

/* app.get('/', (req, res) => {
    res.send('Hello World!');
}); */

/* Пересчет итогов корзины */
function updateCart(cart) {
    cart.amount = Object.values(cart.contents).reduce((sum, el) => sum + el.price * el.quantity, 0);
    cart.countGoods = Object.values(cart.contents).reduce((sum, el) => sum + el.quantity, 0);
}

function addStats(body, path = '../server/db/stats.json') {
    console.log(body);

    const statsItem = { action: '', id: '', date: '' };
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const stats = JSON.parse(data);

            if (body.action === 'add') {
                statsItem.action = body.action;
                statsItem.id = (body.product).id_product;
                statsItem.date = now.format('dddd, MMMM DD YYYY, h:mm:ss');

                stats.push(statsItem);
                console.log(stats);

                fs.writeFile(path, JSON.stringify(stats), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

            } else if (body.action === 'del') {
                statsItem.action = body.action;
                statsItem.id = (body.product).id_product;
                statsItem.date = now.format('dddd, MMMM DD YYYY, h:mm:ss');

                stats.push(statsItem);
                console.log(stats);

                fs.writeFile(path, JSON.stringify(stats), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
}

/* Запись в userCart.json c с отправкой результата */
function writeToFile(path, data, body, res) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            res.send('{"result": 0, "error": err}');
        } else {
            res.send('{"result": 1}');
            addStats(body);
        }
    });
}

/**
 * Активируем мидлвары
 */
app.use(express.json());                    // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('../public'));  // Запросы в корень нашего сайта отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
    fs.readFile('../server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
    console.log('API GET CART');
    /* console.log(req.method); */
    fs.readFile('../server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

app.post('/api/cart', (req, res) => {
    console.log('API POST CART');
    fs.readFile('../server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, error: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            if ((req.body).action === 'add') {
                // добавляем новый товар
                ((req.body).product).quantity = 1;
                cart.contents[((req.body).product).id_product] = (req.body).product;
                updateCart(cart);
                // пишем обратно
            } else if ((req.body).action === 'del') {
                delete cart.contents[((req.body).product).id_product];
                updateCart(cart);
            }
            // пишем обратно
            writeToFile('../server/db/userCart.json', cart, req.body, res);
        }
    });
});

app.put('/api/cart', (req, res) => {
    console.log('API PUT CART');
    fs.readFile('../server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, error: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            if ((req.body).action === 'add') {
                cart.contents[((req.body).product).id_product].quantity++;
                updateCart(cart);
            } else if ((req.body).action === 'del') {
                cart.contents[((req.body).product).id_product].quantity--;
                updateCart(cart);
            }
            writeToFile('../server/db/userCart.json', cart, req.body, res);
        }
    });

});

/**
 * API Статистики
 */
/* app.post('/api/stats', (req, res) => {
    console.log('API POST STATS');
    console.log(req.body);
    fs.readFile('../server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error')
            res.sendStatus(404, JSON.stringify({ result: 0, error: err }));
        } else {
            const stats = JSON.parse(data);
            console.log(req.body);
            (req.body).date = now.format('dddd, MMMM DD YYYY, h:mm:ss');
            console.log(req.body);
            stats.push(req.body);
            writeToFile('../server/db/stats.json', stats, res);
        }
    });
}); */

/**
 * Запуск сервера
 * @type {string|number}
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});
