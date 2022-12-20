namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
  }
}
