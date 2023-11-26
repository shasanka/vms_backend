import express from 'express';
import stateController from '../../controller/stateController';
import authJwt from '../../middleware/authJwt';

const router = express.Router();
router.use(authJwt.verifyToken);
router.post('/', stateController.addStatesData)
router.get("/",stateController.getStates)
router.get("/:stateName",stateController.getDistricts)

export default router