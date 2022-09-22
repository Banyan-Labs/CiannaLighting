import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import verifyAuthorization from '../middleware/verifyAuthorization';
import projectController from '../controller/projectController';
import ROLES_LIST from '../../config/rolesList';

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER));
router
  .get('/get-projects', projectController.getAllProjects)
  .post('/account-projects', projectController.getAccountProjects)
  .get('/find-project', projectController.getProject)
  .post('/create-project', projectController.createProject)
  .delete('/delete-project', projectController.deleteProject);

export = router;
