import express from "express";
import controller from "../controller/userController";

const router = express.Router();

// Public Routes: no login required for these
router.post("/login/user", controller.login);
router.post("/log_out/user", controller.logOut);

export = router;
