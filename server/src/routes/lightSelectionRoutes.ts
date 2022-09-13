import express from "express";
import lightSelectionController from "../controller/lightSelectionController";
const router = express.Router();

router.get("/get-lightSelections", lightSelectionController.getAllSelectedLights);
router.post("/create-lightSelection", lightSelectionController.lightSelected);
router.delete("/delete-lightSelection", lightSelectionController.deleteSelectedLight);

export = router;