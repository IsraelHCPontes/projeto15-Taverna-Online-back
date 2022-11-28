import {showProducts, createProduct,getProductsCart} from '../controllers/productController.js';
import {Router} from 'express';
import productValidation from '../middlewares/productValidationMiddleware.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';

const router = Router();

router.get("/products", showProducts);
router.post("/products", productValidation, createProduct);
router.get("/cart",tokenValidation,getProductsCart);

export default router;