import allowedOrigins from "./domainOrigins";
const corsOptions = {
  origin: (origin: any, callback: any) => {
    console.log("ORIGIN: ", origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
