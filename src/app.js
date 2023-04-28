import express, { json, urlencoded } from 'express';
import products_router from './routes/products_routes.js';
import carts_router from './routes/carts_routes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';


const app = express();
const httpServer = app.listen(8080, () => console.log('Listening to port 8080'));
let productsList = []

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', products_router);
app.use('/api', carts_router);
app.use('/', viewsRouter)

io.on('connection', socket =>{
    console.log('New Client Connected')

    io.emit('productsList', productsList)

   /*  socket.on('addProduct', () => {
        
        io.sockets.emit('productList', productList)
    }); */
})