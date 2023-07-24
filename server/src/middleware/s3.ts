import * as AWS from "aws-sdk";

import logging from "../../config/logging";
import envVars from "../config";
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = envVars;

const s3 = new AWS.S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

export const uploadFunc = async (files: any, item_ID?: string) => {
  try {
    const response = files.map(async (field: any) => {
      const params = field.map((file: any) => {
        return {
          Bucket: AWS_BUCKET_NAME,
          Key: `uploads/${item_ID || ''}-${file.fieldname}-${file.originalname}`,
          Body: file.buffer,
          field: file.fieldname,
        };
      });

      return await Promise.all(
        params.map(async (param: any) => {
          return {
            s3Upload: await s3
              .upload({
                Bucket: param.Bucket,
                Key: param.Key,
                Body: param.Body,
              })
              .promise(),
            field: param.field,
          };
        })
      );
    });

    return await Promise.all(response.map(async (res: any) => res));
  } catch (error: any) {
    logging.error(error.message, "uploadFunc");
    return error;
  }
};
