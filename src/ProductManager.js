const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.path = '../'+path;
    }

    checkProductExistance = async (id) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        const index = parsedList.findIndex(product => {
            return product.id == id;
        });

        if (index !== -1) {
            return true;
        } else {
            return false ;
        }
    }

    validateFields(fields) {
        const validFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
        for (const field in fields) {
            if (!validFields.includes(field)) {
            return false;
        }}
        return true;
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
            return 'No products added yet';
        } else{
            return findedProducts;
        }
    }

    addProduct = async(object) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        
        const lastProduct = parsedList[parsedList.length - 1];
        const lastId = lastProduct ? lastProduct.id : 0;
        const newId = lastId + 1;

        const new_product = {
            id: newId,
            title: object.title,
            description: object.description,
            code: object.code,
            price: object.price,
            status: true,
            stock: object.stock,
            category: object.category,
            thumbnails: object.thumbnails
        }

        let codes = [];
        


        parsedList.map(product => {
            codes.push(product.code);
        })

        if (codes.includes(new_product.code)) {
            return "This code already exists, it can't be added to the Products Array";
        } else {
            parsedList.push(new_product);
            await fs.promises.writeFile(this.path, JSON.stringify(parsedList));
            return 'Products file updated';
        }
    }

    getProductById = async(id) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        const index = parsedList.findIndex(product => {
            return product.id == id;
        });

        if (index !== -1) {
            return parsedList[index];
        } else {
            return "Can't find the product. This id does not exist";
        }
    }

    updateProduct = async(id, updatedFields) => {
        const productsList = await fs.promises.readFile(this.path, 'utf-8');
        const parsedList = JSON.parse(productsList);
        
        if (!parsedList[id]) {
            return { error: "Can't update the product. This id does not exist" };
        }
        
        if (!this.validateFields(updatedFields)) {
            return { error: "Campo inválido" };
        }

        Object.assign(parsedList[id], updatedFields);
        await fs.promises.writeFile(this.path, JSON.stringify(parsedList))
        return "Product Updated";
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
            return "Product Deleted"
        } else {
            return "Can't delete the product. This id does not exist";
        }
    }

}

module.exports = ProductManager