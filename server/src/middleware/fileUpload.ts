import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
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
        return cb(new Error('File type not supported'));
    }
};
// app.post('/profile', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//     } else if (err) {
//       // An unknown error occurred when uploading.
//     } else {
//     // Everything went fine.
//       console.log(req.file)
//     }

//   })
// })

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

const multiUpload = upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'pdf', maxCount: 5 },
    { name: 'specs', maxCount: 5 },
    { name: 'drawingFiles', maxCount: 5 },
]);

export default multiUpload;
