const fs = require('fs');

class ProductManager {
    static last_id = 0;
    constructor (path) {
        this.path = '../'+path;
        this.products = [];
    }

    getProducts = async (limit) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        let findedProducts = [];
        let index = 0

        parsedList.forEach((product) => {
            if(index >= limit) {
                return;
            } else {
                index = index +1
                findedProducts.push(product)
            }
        });

        if(findedProducts.length === 0) {
            console.log('No products added yet');
        } else{
            console.log(findedProducts);
        }
    }

    addProduct = async(title, description, price, thumbnail, code, stock) => {
        const new_product = {
            id: ProductManager.last_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        let codes = [];
        
        this.products.map(product => {
            codes.push(product.code);
        })

        if (codes.includes(new_product.code)) {
            console.log("This code already exists, it can't be added to the Products Array");
        } else {
            ProductManager.last_id = ProductManager.last_id +1;
            this.products.push(new_product);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log('Products file updated');
        }
    }

    getProductById = async(id) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        const index = parsedList.findIndex(product => {
            return product.id == id;
        });

        if (index !== -1) {
            console.log(parsedList[index]);
        } else {
            console.log("Can't find the product. This id does not exist");
        }
    }

    updateProduct = async(object) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        const index = parsedList.findIndex(product => {
            return product.id === object.id;
        });

        if (index !== -1) {
            parsedList[index] = object;
            await fs.promises.writeFile(this.path, JSON.stringify(parsedList))
            console.log("Product Updated")
        } else {
            console.log("Can't update the product. This id does not exist");
        }
    }

    deleteProduct = async(id) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        const index = parsedList.findIndex(product => {
            return product.id === id;
        });

        if (index !== -1) {
            parsedList.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(parsedList))
            console.log("Product Deleted")
        } else {
            console.log("Can't delete the product. This id does not exist");
        }
    }

}

module.exports = ProductManager