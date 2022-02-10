/**
 * обновили итоги корзины
 */
const updateCart = (cart) => {
    cart.amount = (cart.contents).reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.countGoods = (cart.contents).reduce((sum, item) => sum + item.quantity, 0);
}

const add = (cart, req) => {
    cart.contents.push(req.body);
    updateCart(cart);
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    updateCart(cart);
    return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    updateCart(cart);
    return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};
