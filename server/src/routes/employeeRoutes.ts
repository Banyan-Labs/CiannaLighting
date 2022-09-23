import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import verifyAuthorization from '../middleware/verifyAuthorization';
import catalogController from '../controller/catalogController';
import lightSelectionController from '../controller/lightSelectionController';
import ROLES_LIST from '../../config/rolesList';
const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.EMPLOYEE));
router
  .get('/get-catalog', catalogController.getCatalogItems)
  .post('/create-light', catalogController.createCatalogItem)
  .get('/find-light', catalogController.getLight)
  .delete('/remove-light', catalogController.removeLight)
  .get('/get-lightSelections', lightSelectionController.getAllSelectedLights)
  .get('/find-lightSelection', lightSelectionController.getSelectedLight)
  .post('/create-lightSelection', lightSelectionController.lightSelected)
  .delete(
    '/delete-lightSelection',
    lightSelectionController.deleteSelectedLight
  );

export = router;
