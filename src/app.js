const express = require('express')
const products_router = require('./routes/products_routes');
const carts_router = require('./routes/carts_routes');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', products_router);
app.use('/api', carts_router);

app.listen(8080, () => {
    console.log('Executing in Port 8080');
});