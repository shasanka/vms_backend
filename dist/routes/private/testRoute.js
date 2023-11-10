"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = __importDefault(require("../../controller/testController"));
const authJwt_1 = __importDefault(require("../../middleware/authJwt"));
const router = express_1.default.Router();
router.get("/all", [authJwt_1.default.verifyToken], testController_1.default.allAccess);
router.get("/user", [authJwt_1.default.verifyToken], testController_1.default.userBoard);
router.get("/mod", [authJwt_1.default.verifyToken, authJwt_1.default.isModerator], testController_1.default.moderatorBoard);
router.get("/admin", [authJwt_1.default.verifyToken, authJwt_1.default.isAdmin], testController_1.default.adminBoard);
exports.default = router;
