import express, { Request, Response } from "express";
import authJwt from "../../middleware/authJwt";
import visitorController from "../../controller/visitorController";

const router = express.Router();

router.use(authJwt.verifyToken);
router.get("/", visitorController.getVisitor);
router.post("/", visitorController.addVisitor);
router.put("/", visitorController.updateVisitor);
router.delete("/", visitorController.deleteVisitor);

export default router;
