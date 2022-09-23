import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import verifyAuthorization from '../middleware/verifyAuthorization';
import projectController from '../controller/projectController';
import rfpController from '../controller/rfpController';
import roomController from '../controller/roomController';
import ROLES_LIST from '../../config/rolesList';

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER));
router
  // Project Routes
  .get('/get-projects', projectController.getAllProjects)
  .post('/account-projects', projectController.getAccountProjects)
  .get('/find-project', projectController.getProject)
  .post('/create-project', projectController.createProject)
  .delete('/delete-project', projectController.deleteProject)
  // Room Routes
  .get('/get-rooms', roomController.getAllRooms)
  .get('/find-room', roomController.getRoom)
  .post('/create-room', roomController.createRoom)
  .delete('/delete-room', roomController.deleteRoom)
  // Rfp Routes
  .get('/get-rfps', rfpController.getRFPS)
  .post('/create-rfp', rfpController.createRfp)
  .post('/account-rfps', rfpController.getAccountRFPS)
  .post('/find-rfp', rfpController.findRFP)
  .delete('/delete-rfp', rfpController.deleteRFP);
export = router;
