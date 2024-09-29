import express from "express";
import { savemovie, getmovie, getallmovie, updatemovie } from "../controllers/moviecontrollers.js";

const router=express.Router();



router.post("/savemovie",savemovie);
router.post("/getmovie",getmovie);
router.post("/getallmovie",getallmovie);
router.post("/updatemovie",updatemovie);

export default router;

