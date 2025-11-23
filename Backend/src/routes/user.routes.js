import {Router} from "express";
import registerUser from "../controller/user.controller.js";

const router = Router();  //create instance of Router class

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default userRouter;