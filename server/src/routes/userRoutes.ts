import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import controller from '../controller/userController';
import verifyRoles from '../middleware/verifyRoles';
import ROLES_LIST from '../../config/rolesList';

const router = express.Router();

router.post('/login/user', controller.login);
router.post('/log_out/user', controller.logOut);
router.post('/create/user', controller.createUser);
// Protected Routes
// Note: All routes placed below verifyJWT will require an access token.
router.use(verifyJWT);
router.get('/get/users', verifyRoles(ROLES_LIST.ADMIN), controller.getAllUsers);

export = router;
