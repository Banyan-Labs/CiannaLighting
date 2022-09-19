import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import controller from '../controller/userController';

const router = express.Router();

router.post('/create/user', controller.createUser);
router.post('/login/user', controller.login);
router.post('/log_out/user', controller.logOut);

// Protected Routes
// Note: All routes placed below verifyJWT will require an access token.
router.use(verifyJWT);
router.get('/get/users', controller.getAllUsers);
export = router;
