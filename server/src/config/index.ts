import path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "..", "..") + "/.env",
});

const envVars = {
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000, http://localhost:3001",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access_token_secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret",
  DATABASE_URI: process.env.DATABASE_URI || "mongodb://localhost:27017",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'private',
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION || 'private',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'private',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || 'private',
  PORT: process.env.PORT || 1337,
};

export type EnvVars = typeof envVars;

export default envVars;
