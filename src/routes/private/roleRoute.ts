import express from 'express';
import roleController from '../../controller/roleController';
import authJwt from '../../middleware/authJwt';

const router = express.Router();
router.use(authJwt.verifyToken);
router.get('/',roleController.getRole)

export default router