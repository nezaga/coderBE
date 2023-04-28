import express from 'express';
import ProductManager from '../ProductManager.js';

const router = express.Router();
const pm = new ProductManager('Products.json');

let productsList = []

router.get('/', async (req,res)=> {
    let productList = await pm.getProducts(req.query.limit)
    res.render('home', {productList})
});

router.get('/realtimeproducts', async (req,res) => {
    productsList = await pm.getProducts(req.query.limit)
    res.render('realTimeProducts', {productsList})  
});

router.post('/realtimeproducts', async (req, res) => {
    if (req.body.hasOwnProperty('title') && req.body.title !== "" && req.body.hasOwnProperty('description') && req.body.description !== "" && req.body.hasOwnProperty('code') && req.body.code !== "" && req.body.hasOwnProperty('price') && req.body.price >= 0 && req.body.hasOwnProperty('stock') && req.body.stock >= 0 && req.body.hasOwnProperty('category') && req.body.category !== "") {
        const response = await pm.addProduct(req.body);
        productsList.push(req.body)
        res.render('realTimeProducts', {layout: 'main', productsList})
    } else {
        res.status(400).send({ error: 'There is an error on the request. Please adjust and resend' });
    }
});

export default router;