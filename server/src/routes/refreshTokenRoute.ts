import express from 'express';
import refreshToken from '../controller/refreshTokenController';
const router = express.Router();

router.get('/', refreshToken);

export = router;
