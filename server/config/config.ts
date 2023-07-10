import envVars from "../src/config";

export const config = {
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      maxPoolSize: 50,
      autoIndex: false,
      retryWrites: false,
    },
    url: envVars.DATABASE_URI as string,
  },
  server: {
    host: "localhost",
    port: envVars.PORT,
  },
};

export default config;
