import allowedOrigins from "./domainOrigins";
import logging from "./logging";

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      logging.error(`CORS: ${origin} not allowed by CORS`, "corsOptions");
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
