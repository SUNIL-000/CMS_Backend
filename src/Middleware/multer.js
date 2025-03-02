import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    

    cb(null, "Photos/")
  },
  filename(req, file, cb) {
    console.log(file);
    
    const id = uuid();
    const lastName = file.originalname.split(".").pop();
    console.log(lastName);

    const fileName = `${id}.${lastName}`;
    cb(null, fileName);
  },
});
export const upload = multer({ storage });

