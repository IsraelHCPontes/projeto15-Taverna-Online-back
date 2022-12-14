import {signUp, signIn, getUser} from '../controllers/authController.js';
import {Router} from 'express';
import signUpValidation from '../middlewares/signUpValidationMiddleware.js';
import signInValidation from '../middlewares/signInValidationMiddleware.js';

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("/sign-in", signInValidation, signIn);
router.get("/user", getUser);

export default router;