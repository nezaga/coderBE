import express, { json, urlencoded } from 'express';
import products_router from './routes/products_routes';
import carts_router from './routes/carts_routes';
import handlebars from 'express-handlebars';
import __dirname from './utils';


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', products_router);
app.use('/api', carts_router);
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'(/views')
app.set('view engine', 'handlebars')


app.listen(8080, () => {
    console.log('Executing in Port 8080');
});