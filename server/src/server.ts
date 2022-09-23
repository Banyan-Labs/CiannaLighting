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
import publicRoutes from './routes/publicRoutes';
import refreshRoute from './routes/refreshTokenRoute';
import adminRoutes from './routes/adminRoutes';
const router = express();

/** Server Handler */
const httpServer = http.createServer(router);

router.use(cookieParser());
router.use(credentials);
router.use(cors(corsOptions)); // add any rules into the corsOptions file.
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info('Mongoose CONNECTED.');
  })
  .catch((error: any) => {
    logging.error(error);
  });

router.use((req, res, next) => {
  logging.info(
    `METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress}`
  );
  res.on('finish', () => {
    logging.info(
      `METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress} - STATUS: '${res.statusCode}`
    );
  });
  next();
});

/**Routes */
router.use('/api', refreshRoute);
router.use('/api/admin', adminRoutes);
router.use('/api/user', publicRoutes);
router.use('/api', userRoutes);

/**Errors */
router.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

/**Requests */
httpServer.listen(config.server.port, () => {
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port}`
  );
});
