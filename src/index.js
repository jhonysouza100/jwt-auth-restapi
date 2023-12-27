import express from 'express';
import './connection/database.js';
import { config } from 'dotenv';
import morgan from 'morgan';

// rutas
import productsRoutes from './routes/products.routes.js';

config();

const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.json({
    "Hola": "Mundo"
  })
});

server.use('/products', productsRoutes);

server.listen(process.env.PORT);