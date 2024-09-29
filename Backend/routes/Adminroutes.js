import {addadmin, loginadmin,logoutadmin} from "../controllers/Admincontroller.js";
import express from "express";

const router = express.Router();

router.post("/addadmin",addadmin);
router.post("/loginadmin",loginadmin);
router.post("/logoutadmin",logoutadmin);

export default router;

