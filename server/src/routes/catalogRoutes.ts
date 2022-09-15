import express from "express";
import catalogController from "../controller/catalogController";
const router = express.Router();

router.post("/create-light", catalogController.createCatalogItem);
router.get("/get-catalog", catalogController.getCatalogItems);
router.get("/find-light", catalogController.getLight);
router.delete("/remove-light", catalogController.removeLight);

export = router;