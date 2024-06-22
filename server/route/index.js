import express from "express";
const router=express.Router();
// const maincontroller=require('../controllers/maincontroller');
import {homepage,about} from '../controllers/maincontroller.js';
router.get("/",homepage);
router.get("/about",about);
//module.exports=router;
export default router;