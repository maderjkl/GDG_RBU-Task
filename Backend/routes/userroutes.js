import express from "express";
import { signup, login ,logout} from "../controllers/usercontrollers.js";
const router = express.Router();

router.post("/Signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router