import express from "express";
import controller from "../controller/refreshTokenController";
const router = express.Router();

router.get("/refresh", controller.refreshTokenController);

export = router;
