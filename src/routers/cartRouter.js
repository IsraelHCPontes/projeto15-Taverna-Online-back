import {showCart, addToCart, removeFromCart} from '../controllers/cartController.js';
import {Router} from 'express';
import cartValidation from '../middlewares/cartValidationMiddleware.js';

const router = Router();

router.get("/cart", showCart);
router.post("/cart", cartValidation, addToCart);
router.delete("/cart/:id", removeFromCart);

export default router;