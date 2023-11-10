import express from "express";
import testController from "../../controller/testController";
import authJwt from "../../middleware/authJwt";

const router = express.Router();
router.get("/all", [authJwt.verifyToken],testController.allAccess);

router.get("/user", [authJwt.verifyToken], testController.userBoard);

router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  testController.moderatorBoard
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  testController.adminBoard
);

export default router;
