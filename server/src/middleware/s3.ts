import * as AWS from "aws-sdk";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadFunc = async (files: any) => {
  try {
    const response = files.map(async (field: any) => {
      const params = field.map((file: any) => {
        console.log("S3 FILE!! pre send: ", file);
        return {
          Bucket: bucketName,
          Key: `uploads/${Date.now()}-${file.originalname}`,
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
  } catch (error) {
    console.log(error);
  }
};

// export const getfieldtream = (fileKey: string) => {
//   const downloadParams = {
//     Key: fileKey, // maybe see if you can get all the array images.
//     Bucket: bucketName,
//   };

//   return s3.getObject(downloadParams).createReadStream();
// };
