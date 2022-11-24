import {showProducts, createProduct} from '../controllers/productController.js';
import {Router} from 'express';
import productValidation from '../middlewares/productValidationMiddleware.js';

const router = Router();

router.get("/products", showProducts);
router.post("/products", productValidation, createProduct);

export default router;