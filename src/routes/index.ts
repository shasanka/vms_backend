import express from 'express';
import authRoute from "./auth/auth";
import visitorRoute from "./private/visitorRoute";
import stateRoute from "./private/stateRoute";

const router = express.Router();


router.use("/auth", authRoute);
router.use("/visitor", visitorRoute);
router.use("/state", stateRoute);

export default router