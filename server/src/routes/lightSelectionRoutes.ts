import express from "express";
import lightSelectionController from "../controller/lightSelectionController";
const router = express.Router();

router.get("/get-lightSelections", lightSelectionController.getAllSelectedLights);
router.get("/find-lightSelection", lightSelectionController.getSelectedLight)
router.post("/create-lightSelection", lightSelectionController.lightSelected);
router.delete("/delete-lightSelection", lightSelectionController.deleteSelectedLight);

export = router;