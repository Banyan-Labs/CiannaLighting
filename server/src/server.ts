import http from 'http';
import express from 'express';
import logging from '../config/logging';
import config from '../config/config';
import cookieParser from 'cookie-parser';
import corsOptions from '../config/corsOptions';
import credentials from './middleware/credentials';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import roomRoutes from './routes/roomRoutes';
import lightSelectionRoutes from './routes/lightSelectionRoutes';
import refreshRoute from './routes/refreshTokenRoute';

const router = express();

/** Server Handler */
const httpServer = http.createServer(router);

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info('Mongoose CONNECTED.');
  })
  .catch((error: any) => {
    logging.error(error);
  });

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
router.use(credentials);

// Cross Origin Resource Sharing
router.use(cors(corsOptions));

// Middleware for cookies
router.use(cookieParser());

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
/**Routes */

router.use('/api/projects', projectRoutes);
router.use('/api/rooms', roomRoutes);
router.use('/api/lightSelector', lightSelectionRoutes);
router.use('/api/user', userRoutes);
router.use('/refresh', refreshRoute);

/**Requests */
httpServer.listen(config.server.port, () => {
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port}`
  );
});
