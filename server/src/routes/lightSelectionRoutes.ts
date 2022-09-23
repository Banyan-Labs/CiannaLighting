import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import lightSelectionController from "../controller/lightSelectionController";
import ROLES_LIST from "../../config/rolesList";

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.EMPLOYEE));
router
  .get("/get-lightSelections", lightSelectionController.getAllSelectedLights)
  .get("/find-lightSelection", lightSelectionController.getSelectedLight)
  .post("/create-lightSelection", lightSelectionController.lightSelected)
  .delete(
    "/delete-lightSelection",
    lightSelectionController.deleteSelectedLight
  );

export = router;
