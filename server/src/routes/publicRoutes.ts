import express from "express";
import controller from "../controller/userController";
import statusController from "../controller/statusAndRegionController";
import catalogController from "../controller/catalogController";
import activityController from '../controller/activityController';
const router = express.Router();

// Public Routes: no login required
router.post("/login/user", controller.login);
router.post("/log_out/user", controller.logOut);
router.post("/s_r", statusController.getData);
router.post("/get-catalog", catalogController.getCatalogItems);
router.post("/find-light", catalogController.getLight);
router.post("/create-log", activityController.createActivityLog);


export default router;
