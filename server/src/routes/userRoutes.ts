import express from "express";

import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import projectController from "../controller/projectController";
import roomController from "../controller/roomController";
import lightSelectionController from "../controller/lightSelectionController";
import catalogController from "../controller/catalogController";
import userController from "../controller/userController";
import ROLES_LIST from "../../config/rolesList";
import multiUpload from "../middleware/fileUpload";

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER, ROLES_LIST.EMPLOYEE));

router
  .post("/find-light", catalogController.getLight)
  // Project Routes
  .post("/get-projects", projectController.getAllProjects)
  .post("/account-projects", projectController.getAccountProjects)
  .post("/find-project", projectController.getProject)
  .post("/create-project", projectController.createProject)
  .post("/delete-project", projectController.deleteProject)
  .post("/get-attachments", projectController.getAttachments)
  // Room Routes
  .post("/get-rooms", roomController.getAllRooms)
  .post("/find-room", roomController.getRoom)
  .post("/create-room", roomController.createRoom)
  .post("/delete-room", roomController.deleteRoom)
  // Light Selection Routes
  .post("/get-lightSelections", lightSelectionController.getAllSelectedLights)
  .post("/find-lightSelection", lightSelectionController.getSelectedLight)
  .post("/create-lightSelection", lightSelectionController.lightSelected)
  .post("/delete-lightSelection", lightSelectionController.deleteSelectedLight)
  .post("/get-lightSelections-for-project", lightSelectionController.getLightSelectionsForProject)

export default router;
