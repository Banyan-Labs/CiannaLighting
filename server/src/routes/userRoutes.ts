import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import projectController from "../controller/projectController";
import rfpController from "../controller/rfpController";
import roomController from "../controller/roomController";
import lightSelectionController from "../controller/lightSelectionController";
import catalogController from "../controller/catalogController";
import userController from "../controller/userController";
import ROLES_LIST from "../../config/rolesList";
import multiUpload from "../middleware/fileUpload";
import projectAttchmentController from "../controller/projectAttchmentController";
const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER));
router
  .post("/find-user", userController.getUser)
  .post("/find-light", catalogController.getLight)
  
  // Project Routes
  .post("/get-projects", projectController.getAllProjects)
  .post("/account-projects", projectController.getAccountProjects)
  .post("/find-project", projectController.getProject)
  .post("/create-project", projectController.createProject)
  .post("/delete-project", projectController.deleteProject)

  //ProjAttachments
  .post("/new-attachments",multiUpload, projectAttchmentController.addAttachmentSection)
  .post("/get-attachments", projectAttchmentController.getData)
  .post("/delete-attachments", projectAttchmentController.deleteData)
  // Room Routes
  .post("/get-rooms", roomController.getAllRooms)
  .post("/find-room", roomController.getRoom)
  .post("/create-room", roomController.createRoom)
  .post("/delete-room", roomController.deleteRoom)
  // Light Selection Routes
  .post("/get-lightSelections", lightSelectionController.getAllSelectedLights)
  .post("/find-lightSelection", lightSelectionController.getSelectedLight)
  .post("/create-lightSelection", lightSelectionController.lightSelected)
  .post(
    "/delete-lightSelection",
    lightSelectionController.deleteSelectedLight
  )
  // Rfp Routes
  .post("/create-rfp", multiUpload, rfpController.createRfp)
  .post("/account-rfps", rfpController.getAccountRFPS)
  .post("/find-rfp", rfpController.findRFP)
  //newRFP
  .post("/get-rfps", rfpController.getRFPS)
  .post("/edit-props", rfpController.rfpEditor)
  .post("/update-rfp", rfpController.rfpUpdater)
  .post("/delete-props", rfpController.deleteProp)
  .post("/get-proposals", rfpController.getProposalRows)
  .post("/delete-rfp", rfpController.deleteRFP)
export default router;
