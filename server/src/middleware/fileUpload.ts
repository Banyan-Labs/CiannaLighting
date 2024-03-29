import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

import { AttachmentType } from "../utils/constants";

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];
const filetypes = /jpeg|jpg|png|gif|pdf/;

const multerStorage = multer.memoryStorage();

const multerFilter = async (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const extname = filetypes.test(path.extname(file.originalname).toString());

  if (allowedMimeTypes.includes(file.mimetype) && extname) {
    cb(null, true);
  } else {
    return cb(new Error("File type not supported"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const multiUpload = upload.fields([
  { name: AttachmentType.IMAGE, maxCount: 5 },
  { name: AttachmentType.RENDERING, maxCount: 5 },
  { name: AttachmentType.CUT_SHEET, maxCount: 5 },
  { name: AttachmentType.DRAWING_FILE, maxCount: 5 },
]);

export default multiUpload;
