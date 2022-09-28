import express from "express";
import controller from "../controller/userController";
import statusController from "../controller/statusAndRegionController"

const router = express.Router();

// Public Routes: no login required for these
router.post("/login/user", controller.login);
router.post("/log_out/user", controller.logOut);
router.post("/s_r", statusController.getData);

export = router;
