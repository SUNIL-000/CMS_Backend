import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    

    cb(null, "../Frontend/public/images")
  },
  filename(req, file, cb) {
    const id = uuid();
    const lastName = file.originalname.split(".").pop();
    console.log(lastName);

    const fileName = `${id}.${lastName}`;
    cb(null, fileName);
  },
});

export const SingleUpload = multer({ storage }).single("photo");
