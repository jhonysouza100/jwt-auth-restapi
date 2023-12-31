import express from 'express';
import './connection/database.js';
import { config } from 'dotenv';
import morgan from 'morgan';

// initial setup
import { createRoles } from './libs/initialSetup.js';

// rutas
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

config();

const server = express();

createRoles(); // crea tres tipos de "roles" en la base de datos

server.use(express.json());

server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.json({
    "Hola": "Mundo"
  })
});

server.use('/products', productsRoutes);
server.use('/api/auth', authRoutes);
server.use('/users', userRoutes);

server.listen(process.env.PORT);