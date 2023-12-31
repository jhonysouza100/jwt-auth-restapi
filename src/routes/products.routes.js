import { Router } from "express";
import * as productsController from '../controllers/products.controller.js';

// middlewares
import { authJwt } from '../middlewares/index.js';
const {verifyToken, isModerator, isAdmin} = authJwt;

const router = Router();

router.post('/', [verifyToken, isModerator], productsController.createProducts);
router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductsById);
router.put('/:productId', [verifyToken, isAdmin], productsController.updateProducts);
router.delete('/:productId', [verifyToken, isAdmin], productsController.deleteProducts);

export default router;