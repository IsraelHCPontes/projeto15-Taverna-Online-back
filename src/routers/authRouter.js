import {signUp} from '../controllers/authController.js';
import signUpValidation from '../middlewares/signUpValidationMiddleware.js';
import {Router} from 'express';

const router = Router();

router.post("/sign-up", signUpValidation, signUp); 

export default router;