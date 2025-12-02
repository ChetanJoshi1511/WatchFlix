import fs from "fs";
import path from "path";
import multer from "multer";

// ensure temp folder exists
const tempDir = path.resolve(process.cwd(), "public", "temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,tempDir);
    },
    filename: function(req,file,cb){
        // prepend timestamp to avoid collisions
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});                   

export const upload = multer({storage: storage});

