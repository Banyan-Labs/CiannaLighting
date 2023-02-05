import express from "express";
import controller from "../controller/adminController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import ROLES_LIST from "../../config/rolesList";
import activityController from "../controller/activityController";
import userController from "../controller/userController";

/**
 * * Admin routes *
 * route prefix /api/cmd
 * example: <domain>/api/cmd/create-use
 */

const router = express.Router();
// Admin Routes
router.use(verifyJWT);
verifyAuthorization(ROLES_LIST.ADMIN),
  router
    .post("/create-user", controller.createNewUser)
    .get("/get-users", controller.getAllUsers)
    .post("/edit-user", userController.getUser)
    .post("/getAllLogs", activityController.getAllLogs)
    .post("/deleteLog", activityController.deleteLog)
    .put("/update-users/add-column", userController.addActiveColumnToUserAndSetToTrue) // TODO: disable this line after route after DB is updated in all environments


export default router;
