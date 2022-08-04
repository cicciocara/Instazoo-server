import multer from 'multer';
import mime from 'mime';

const storage = multer.diskStorage({
  destination: 'src/assets/img',
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      // `${file.originalname.split('.')[0]}.${mime.getExtension(file.mimetype)}`
      `${file.originalname}`
    );
  },
});

export const photoUploaderMiddleware = () => {
  return multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true);
      } else {
        cb(new Error('Image must be png or jpeg'));
      }
    },
  });
};
