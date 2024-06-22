import express from "express";
const router=express.Router();
import dashboardcontroller from '../controllers/dashboardcontroller.js';
import isLoggedIn from "../middleware/checkAuth.js";
import { dashboardViewNote,dashboardUpdateNote,dashboardDeleteNote,dashboardCreateNote,dashboardSubmitNote,dashboardSearchNotes,dashboardSearchSubmitNotes,dashboardDownloadNote,dashboardSetColor,dashboardColored} from "../controllers/dashboardcontroller.js";
router.get('/dashboard',isLoggedIn,dashboardcontroller);
router.get('/dashboard/item/:id',isLoggedIn,dashboardViewNote);
router.put('/dashboard/item/:id',isLoggedIn,dashboardUpdateNote);
router.post('/dashboard/item/:id',isLoggedIn,dashboardDownloadNote);
router.get('/dashboard/new/:id',isLoggedIn,dashboardSetColor);
router.post('/dashboard/new/:id',isLoggedIn,dashboardColored);
router.get('/dashboard/add',isLoggedIn,dashboardCreateNote);
router.post('/dashboard/add',isLoggedIn,dashboardSubmitNote);
router.post('/dashboard/search',isLoggedIn,dashboardSearchSubmitNotes);
router.get('/dashboard/search',isLoggedIn,dashboardSearchNotes);

router.delete('/dashboard/item-delete/:id',isLoggedIn,dashboardDeleteNote);
// document.addEventListener("DOMContentLoaded", function() {
//     var pages =  pages; // Assuming `pages` is a variable you pass from EJS
//     document.querySelectorAll(".page-item").forEach((e) => {
//         if (parseInt(e.innerHTML) > pages) {
//             e.querySelector(".page-link").classList.add("disabled");
//         }
//     });})
export default router;