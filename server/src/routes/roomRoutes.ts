import express from "express";
import roomController from "../controller/roomController";

const router = express.Router();

router.get("/get-rooms", roomController.getAllRooms);
router.post("/create-room", roomController.createRoom);
router.delete("/delete-room", roomController.deleteRoom);

export = router;