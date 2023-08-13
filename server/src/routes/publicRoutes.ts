import express from "express";

import statusController from "../controller/statusAndRegionController";
import catalogController from "../controller/catalogController";
import activityController from "../controller/activityController";
import userController from "../controller/userController";

const router = express.Router();

/**
 * * Public Routes: no login required
 * prefix: /api/public
 */

router.post("/login/user", userController.login)
  .post("/log_out/user", userController.logOut)
  .post("/s_r", statusController.getData)
  .post("/get-catalog", catalogController.getCatalogItems)
  .post("/find-light", catalogController.getLight)
  .post("/create-log", activityController.createLog)
  .post("/forgot-password", userController.resetPassword);

export default router;
