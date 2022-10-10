import http from "http";
require("dotenv").config();
import express from "express";
import logging from "../config/logging";
import config from "../config/config";
import cookieParser from "cookie-parser";
import corsOptions from "../config/corsOptions";
import credentials from "./middleware/credentials";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import publicRoutes from "./routes/publicRoutes";
import refreshRoute from "./routes/refreshTokenRoute";
import adminRoutes from "./routes/adminRoutes";
import employeeRoutes from "./routes/employeeRoutes";

const router = express();

/** Server Handler */
const httpServer = http.createServer(router);
router.use(credentials);
router.use(cookieParser());

router.use(cors(corsOptions)); // add any rules into the corsOptions file.
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("src"));

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info("Mongoose CONNECTED.");
  })
  .catch((error: any) => {
    logging.error(error);
  });

router.use((req, res, next) => {
  logging.info(
    `METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress}`
  );
  res.on("finish", () => {
    logging.info(
      `METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress} - STATUS: '${res.statusCode}`
    );
  });
  next();
});

/**Routes */
router.use("/api/rf", refreshRoute);
router.use("/api/public", publicRoutes);
router.use("/api/cmd", adminRoutes);
router.use("/api/internal", employeeRoutes);
router.use("/api", userRoutes);

/**Errors */
router.use((req, res, next) => {
  const error = new Error("not found");

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
