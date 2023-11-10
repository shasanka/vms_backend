"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controller/authController"));
const verifySignup_1 = __importDefault(require("../../middleware/verifySignup"));
const router = express_1.default.Router();
router.post('/signin', authController_1.default.signIn);
router.post('/signout', authController_1.default.signOut);
router.post('/signup', [verifySignup_1.default.checkDuplicateUsernameOrEmail, verifySignup_1.default.checkRolesExisted], authController_1.default.signUp);
exports.default = router;
