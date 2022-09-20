import express from "express";
import rfpController from "../controller/rfpController";

const router = express.Router();

router.get("/get-rfps", rfpController.getRFPS);
router.post("/create-rfp", rfpController.createRfp);
router.post("/account-rfps", rfpController.getAccountRFPS);
router.post("/find-rfp", rfpController.findRFP);
router.delete("/delete-rfp", rfpController.deleteRFP);

export = router;