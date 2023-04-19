const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager')

const pm = new ProductManager('Products.json');
    
router.get('/products', async (req, res)=>{
    res.status(200).send(await pm.getProducts(req.query.limit))
});

router.get('/products/:pid', async (req, res)=>{
    res.json(await pm.getProductById(req.params.pid))
});

router.post('/products', async (req, res) => {    
    // Verificamos que contenga la key palabra
    if (req.body.hasOwnProperty('title') && req.body.title !== "" && req.body.hasOwnProperty('description') && req.body.description !== "" && req.body.hasOwnProperty('code') && req.body.code !== "" && req.body.hasOwnProperty('price') && req.body.price >= 0 && req.body.hasOwnProperty('stock') && req.body.stock >= 0 && req.body.hasOwnProperty('category') && req.body.category !== "") {
        const response = await pm.addProduct(req.body);
        res.status(200).send(response);
    } else {
        res.status(400).send({ error: 'There is an error on the request. Please adjust and resend' });
    }
});

module.exports = router;