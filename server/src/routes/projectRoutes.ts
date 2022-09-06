import express from "express";
import projectController from "../controller/projectController";

const router = express.Router();

router.get("/get-projects", projectController.getAllProjects);
router.post("/create-project", projectController.createProject);
router.delete("/delete-project", projectController.deleteProject);

export = router;