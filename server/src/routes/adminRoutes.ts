import express from "express";
import controller from "../controller/adminController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import ROLES_LIST from "../../config/rolesList";
import activityController from "../controller/activityController";

const router = express.Router();
// Admin Routes
router.use(verifyJWT);
verifyAuthorization(ROLES_LIST.ADMIN),
  router
    .post("/create-user", controller.createNewUser)
    .get("/get-users", controller.getAllUsers)
    .post("/getAllLogs", activityController.getAllLogs)
    .post("/deleteLog", activityController.deleteLog);

export default router;
