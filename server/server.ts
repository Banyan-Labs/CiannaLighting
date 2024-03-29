require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import logging from "./config/logging";
import config from "./config/config";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import credentials from "./src/middleware/credentials";
import refreshRoute from "./src/routes/refreshTokenRoute";
import adminRoutes from "./src/routes/adminRoutes";
import routes from "./src/routes/deployTestRoutes";
import publicRoutes from "./src/routes/publicRoutes";
import userRoutes from "./src/routes/userRoutes";
import employeeRoutes from "./src/routes/employeeRoutes";
import envVars from "./src/config";

const router = express();

/** Server Handler */
router.use(credentials);
router.use(cookieParser());
router.use(cors(corsOptions));
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
  res.on("finish", () => {
    logging.info(
      `${req.method} request to '${req.url}' returned ${res.statusCode}`
    );
  });

  next();
});

// /**Routes */
router.use("/api/deploy-test", routes);
router.use("/api/rf", refreshRoute);
router.use("/api/cmd", adminRoutes);
router.use("/api/public", publicRoutes);
router.use("/api", userRoutes);
router.use("/api/internal", employeeRoutes);

if (envVars.NODE_ENV !== "development") {
  router.use(express.static(path.join(__dirname, "../../client/build")));
  router.get("*", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "../", "client", "build", "index.html")
    );
  });
}

/**Errors */
router.use((_, res) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

/**Requests */
router.listen(config.server.port, () => {
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port} -------------------- CI/CD`
  );
});
