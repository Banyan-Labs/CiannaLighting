import express from "express";
import controller from  '../controller/userController';

const router = express.Router();

router.post('/create/user', controller.createUser);
router.post('/login/user', controller.login)
router.post('/log_out/user', controller.logOut)
router.get('/get/users', controller.getAllUsers);

export = router;