import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import roomController from "../controller/roomController";
import ROLES_LIST from "../../config/rolesList";

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER));
router.get("/get-rooms", roomController.getAllRooms);
router.get("/find-room", roomController.getRoom);
router.post("/create-room", roomController.createRoom);
router.delete("/delete-room", roomController.deleteRoom);

export = router;
