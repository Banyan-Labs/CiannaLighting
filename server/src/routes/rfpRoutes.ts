import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import verifyAuthorization from '../middleware/verifyAuthorization';
import rfpController from '../controller/rfpController';
import ROLES_LIST from '../../config/rolesList';

const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.USER));
router.get('/get-rfps', rfpController.getRFPS);
router.post('/create-rfp', rfpController.createRfp);
router.post('/account-rfps', rfpController.getAccountRFPS);
router.post('/find-rfp', rfpController.findRFP);
router.delete('/delete-rfp', rfpController.deleteRFP);

export = router;
