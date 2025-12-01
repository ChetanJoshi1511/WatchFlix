import {Router} from "express";
import {registerUser} from "../controller/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();  //create instance of Router class

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name:"coverimage", maxCount: 1}
    ]), //first middle ware
    registerUser //second middle ware
);

export {router as userRouter};