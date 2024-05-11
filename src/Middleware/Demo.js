import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../Frontend/src/images")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      const lastName = file.originalname.split(".").pop();

      cb(null, uniqueSuffix+'.'+lastName)
    }
  })
  
  export const demo = multer({ storage: storage }).single('image')