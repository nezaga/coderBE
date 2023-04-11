const express = require('express')
const ProductManager = require('./ProductManager')

const app = express();

const pm = new ProductManager('Products.json');
    
app.get('/products', async (req, res)=>{
    res.json(await pm.getProducts(req.query.limit))
})

app.get('/products/:pid', async (req, res)=>{
    res.json(await pm.getProductById(req.params.pid))
})

app.listen(8080, () => {
    console.log('Executing in Port 8080');
});