import express from "express";
import entryController from "../../controller/entryController";

const router = express.Router();

router.get("/", entryController.getEntry);
router.post("/", entryController.addEntry);
router.get("/:entryId", entryController.getSingleEntry);

export default router;
