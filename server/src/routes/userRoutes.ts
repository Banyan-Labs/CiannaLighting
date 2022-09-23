import express from "express";
import controller from "../controller/userController";
import verifyJWT from "../middleware/verifyJWT";
import verifyAuthorization from "../middleware/verifyAuthorization";
import ROLES_LIST from "../../config/rolesList";

const router = express.Router();

// Public Routes: no login required for these
router.post("/login/user", controller.login);
router.post("/log_out/user", controller.logOut);

export = router;
