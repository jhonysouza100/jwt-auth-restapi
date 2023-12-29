import { Router } from "express";
import * as productsController from '../controllers/products.controller.js';

// middlewares
import { verifyToken } from '../middlewares/authJWT.js';

const router = Router();

router.post('/', verifyToken, productsController.createProducts);
router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductsById);
router.put('/:productId', productsController.updateProducts);
router.delete('/:productId', productsController.deleteProducts);

export default router;