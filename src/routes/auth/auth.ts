import express from 'express';
import authController from '../../controller/authController';
import verifySignUp from '../../middleware/verifySignup';

const router = express.Router();


router.post('/signin', authController.signIn);
router.post('/signout', authController.signOut)
router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signUp)

export default router