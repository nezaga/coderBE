import express from 'express'
const router = express.Router();
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';

const cm = new CartManager('Carts.json');
const pm = new ProductManager('Products.json');

router.get('/carts/:cid', async (req, res)=>{
    res.status(200).send(await cm.getCartById(req.params.cid))
});

router.post('/carts', async (req, res) => {
    res.status(200).send(await cm.addCart());
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    if (await pm.checkProductExistance(pid)) {
        res.status(200).send(await cm.addProductToCart(cid, pid));
    } else {
        res.status(404).send("Can't find the product ID" );
    }
});



router.delete('/:cid', async (req, res) => {
    if (req.params.pid !== undefined) {
        const id = parseInt(req.params.pid)
        res.json(await cm.deleteProduct(id))
    } else {
        res.status(400).send({ error: 'An Id must be defined in order to delete a product' });
    }
});

export default router;