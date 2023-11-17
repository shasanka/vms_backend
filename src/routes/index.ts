import express from 'express';
import authRoute from "./auth/auth";
import visitorRoute from "./private/visitorRoute";
import stateRoute from "./private/stateRoute";
import roleRoute from "./private/roleRoute";
import entryRoute from "./private/entryRoute";

const router = express.Router();


router.use("/auth", authRoute);
router.use("/visitor", visitorRoute);
router.use("/state", stateRoute);
router.use("/role", roleRoute);
router.use("/entry", entryRoute);

export default router