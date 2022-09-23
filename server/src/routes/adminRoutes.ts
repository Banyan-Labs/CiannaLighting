import express from 'express';
import controller from '../controller/adminController';
import verifyJWT from '../middleware/verifyJWT';
import verifyAuthorization from '../middleware/verifyAuthorization';
import ROLES_LIST from '../../config/rolesList';

const router = express.Router();
// Admin Routes
router.use(verifyJWT);
router.post(
  '/create-user',
  verifyAuthorization(ROLES_LIST.ADMIN),
  controller.createNewUser
);

export = router;
