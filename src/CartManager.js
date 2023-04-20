const fs = require('fs');

class CartManager {
    constructor (path) {
        this.path = '../'+path;
    }

    addCart = async() => {
        const cartsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(cartsList);
        
        const lastCart = parsedList[parsedList.length - 1];
        const lastId = lastCart ? lastCart.id : 0;
        const newId = lastId + 1;

        const new_cart = {
            id: newId,
            products: []
        }

        parsedList.push(new_cart);
        await fs.promises.writeFile(this.path, JSON.stringify(parsedList));
        return 'Cart created';
    }

    getCartById = async(id) => {
        const cartsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(cartsList);
        const index = parsedList.findIndex(cart => {
            return cart.id == id;
        });

        if (index !== -1) {
            return parsedList[index].products;
        } else {
            return "Can't find the cart. This id does not exist";
        }
    }

    addProductToCart = async(cid, pid) => {
        const cartsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(cartsList);

        const cartIndex = parsedList.findIndex(cart => cart.id == cid);
        if (cartIndex === -1) {
            return ({ error: `Cart with id ${cid} not found` });
        }

        const productIndex = parsedList[cartIndex].products.findIndex(p => p.product == pid);
        if (productIndex === -1) {
            // If the product doesn't exist in the cart, add it with quantity 1
            parsedList[cartIndex].products.push({ product: pid, quantity: 1 });
        } else {
            // If the product already exists, increment its quantity by 1
            parsedList[cartIndex].products[productIndex].quantity++;
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(parsedList))
        return "Product Added";
    }

}

module.exports = CartManager