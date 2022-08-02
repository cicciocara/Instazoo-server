import multer from "multer";
import mime from "mime";

const storage = multer.diskStorage({
  destination: "../assets/img",
  filename: (req, file, cb) => {
    cb(null, `Cazzo.${mime.getExtension(file.mimetype)}`);
  },
});

export const photoUploaderMiddleware = () => {
  return multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(new Error("Image must be png or jpeg"));
      }
    },
  });
};
