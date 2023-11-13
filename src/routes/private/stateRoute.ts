import express from 'express';
import stateController from '../../controller/stateController';

const router = express.Router();


router.get("/",stateController.getStates)
router.get("/:stateId",stateController.getDistricts)

export default router