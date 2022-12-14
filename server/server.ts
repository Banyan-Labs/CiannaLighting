// import http from "http";
import http from "http";
if (process.env.NODE_ENV !== "deploy") {
  require("dotenv").config();
}
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import credentials from "./src/middleware/credentials";
import cors from "cors";
import mongoose from "mongoose";
import refreshRoute from "./src/routes/refreshTokenRoute";
import adminRoutes from "./src/routes/adminRoutes";
import routes from "./src/routes/deployTestRoutes";

import publicRoutes from "./src/routes/publicRoutes";
import userRoutes from "./src/routes/userRoutes";
import employeeRoutes from "./src/routes/employeeRoutes";
import path from "path";
import domainOrigins from "./config/domainOrigins";

const router = express();

/** Server Handler */
// const httpServer = http.createServer(router);
router.use(credentials);
router.use(cookieParser());

router.use(cors(corsOptions)); // add any rules into the corsOptions file.
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("src"));
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, "../../client/build")));
} else {
  router.use(express.static(path.join(__dirname, "../client/build")));
}

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
// /**Routes */
var none = '';
if (process.env.NODE_ENV !== 'development') {
  router.get("*", (req, res) => {
    const homePage =
    process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../", "../", "client", "build", "index.html")
    : path.resolve(__dirname, "../", "client", "build", "index.html");
    res.sendFile(homePage);
  });
} 

// router.get("/test", (req, res) => {
//   return res.json({ msg: "test" });
// });

router.use("/api/deploy-test", routes);
router.use("/api/rf", refreshRoute);
router.use("/api/cmd", adminRoutes);
router.use("/api/public", publicRoutes); // << -- crashes app
router.use("/api", userRoutes); //<<-- crashes app
router.use("/api/internal", employeeRoutes); //<<-- crashes app

/**Errors */
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

/**Requests */
router.listen(config.server.port, () => {
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port}`
  );
});

// https.createServer(router).listen(config.server.port, () => {
//   logging.info(
//     `Server is running at ${config.server.host}:${config.server.port}`
//   );
// });
